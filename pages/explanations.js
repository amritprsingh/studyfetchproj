import connectToDatabase from "../../lib/mongodb";
import Explanation from "../../models/Explanation";

export default async function handler(req, res) {
  await connectToDatabase();
  const explanations = await Explanation.find({});
  res.status(200).json(explanations);
}
