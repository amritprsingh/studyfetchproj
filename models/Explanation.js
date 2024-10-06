import mongoose from "mongoose";

const ExplanationSchema = new mongoose.Schema({
  name: String,
  topic: String,
  explanation: String,
});

export default mongoose.models.Explanation ||
  mongoose.model("Explanation", ExplanationSchema);
