import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, name }),
    });

    const data = await res.json();
    setExplanation(data.explanation);
    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: "lightyellow",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "fixed",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "hotpink",
        }}
      >
        Explain Like I&apos;m 5
      </h1>
      <h2 style={{ textAlign: "center", fontWeight: "0", color: "blue" }}>
        Learn about any topic in the simplest way possible
      </h2>

      <div style={{ marginTop: "20px", marginBottom: "2%" }}>
        <Link href="/catalog" passHref>
          <button
            style={{
              width: "15%",
              paddingBottom: "10px",
              paddingTop: "10px",
              fontSize: "1rem",
              backgroundColor: "lightgray",
              color: "black",
              border: "none",
              cursor: "pointer",
              borderRadius: "50px",
            }}
          >
            View Explanation Catalog
          </button>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic"
            style={{
              width: "300px",
              height: "40px",
              padding: "10px",
              fontSize: "1.5rem",
            }}
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{
              width: "300px",
              height: "40px",
              padding: "10px",
              fontSize: "1.5rem",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "20%",
            paddingBottom: "10px",
            paddingTop: "10px",
            fontSize: "1.5rem",
            backgroundColor: "lightblue",
            color: "purple",
            border: "none",
            cursor: "pointer",
            borderRadius: "50px",
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Explanation"}{" "}
        </button>
      </form>
      <h2>Explanation:</h2>
      {explanation && (
        <div syle={{ textAlign: "center" }}>
          <p
            style={{
              width: "75%",
              marginLeft: "12%",
              fontSize: "1.2rem",
              textAlign: "left",
            }}
          >
            {(() => {
              const explanationParts = explanation.split("•");
              const sentences = explanationParts
                .join("•")
                .split(/(?<=[.!?])\s+/);

              const lastSentence = sentences.pop();

              return (
                <>
                  {sentences
                    .join(" ")
                    .split("•")
                    .map((line, index) => (
                      <span key={index}>
                        {index > 0 && "•"} {line.trim()}
                        <br />
                      </span>
                    ))}

                  {lastSentence.trim()}
                </>
              );
            })()}
          </p>
        </div>
      )}
    </div>
  );
}
