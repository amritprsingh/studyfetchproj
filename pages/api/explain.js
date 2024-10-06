import axios from "axios";
import connectToDatabase from "../../lib/mongodb";
import Explanation from "../../models/Explanation";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { topic, name } = req.body;

    try {
      // Call the Anthropic API
      const response = await axios.post(
        "https://api.anthropic.com/v1/complete",
        {
          prompt: `Explain the topic "${topic}" like I'm 5 years old:`,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.ANTHROPIC_API_KEY}`,
          },
        }
      );

      const explanation = response.data.choices[0].text;

      // Connect to MongoDB and save the result
      await connectToDatabase();
      const newExplanation = new Explanation({ name, topic, explanation });
      await newExplanation.save();

      res.status(200).json({ explanation });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch explanation" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
