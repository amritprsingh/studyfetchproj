import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, name }),
    });

    const data = await res.json();
    setExplanation(data.explanation);
  };

  return (
    <div>
      <h1>Explain Like I&apos;m 5</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Get Explanation</button>
      </form>

      {explanation && (
        <div>
          <h2>Explanation:</h2>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}
