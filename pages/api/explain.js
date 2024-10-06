import axios from "axios";
import connectToDatabase from "../../lib/mongodb";
import Explanation from "../../models/Explanation";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { topic, name } = req.body;

    try {
      // Call the Anthropic API with proper headers and prompt formatting
      const response = await axios.post(
        "https://api.anthropic.com/v1/complete",
        {
          prompt: `\n\nHuman: Explain the topic "${topic}" like I'm 5 years old.\n\nAssistant:`,
          model: "claude-v1", // Model name
          max_tokens_to_sample: 150, // Correct field for token count
          temperature: 0.7, // Adjust if needed
        },
        {
          headers: {
            "x-api-key": process.env.ANTHROPIC_API_KEY, // Correct API key
            "Content-Type": "application/json",
            "anthropic-version": "2023-01-01", // Ensure correct version
          },
        }
      );

      // Extract the explanation from the response
      const explanation = response.data.completion;

      // Connect to MongoDB and save the result
      await connectToDatabase();
      const newExplanation = new Explanation({ name, topic, explanation });
      await newExplanation.save();

      // Respond with the explanation
      res.status(200).json({ explanation });
    } catch (error) {
      console.error(
        "Error fetching explanation:",
        error.response ? error.response.data : error.message
      );
      res.status(500).json({ error: "Failed to fetch explanation" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
