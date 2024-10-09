import { useEffect, useState } from "react";
import Link from "next/link"; // Import the Link component

export default function Catalog() {
  const [explanations, setExplanations] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchExplanations = async () => {
      const res = await fetch("/api/explanations");
      const data = await res.json();
      setExplanations(data);
    };

    fetchExplanations();
  }, []);

  // Sort explanations by name when the user clicks the header
  const handleSort = () => {
    const sortedData = [...explanations].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setExplanations(sortedData);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div
      style={{
        width: "80%",
        backgroundColor: "lightyellow",
        width: "100%",
        paddingTop: "5px",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "hotpink" }}>Explanation Catalog</h1>
      <h2 style={{ textAlign: "center", fontWeight: "0", color: "blue" }}>
        See past topics requested and the requester names
      </h2>
      {/* Button to go back to the form */}
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Link href="/" passHref>
          <button
            style={{
              width: "15%", // Make button a bit wider to match input
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
            Go Back to Form
          </button>
        </Link>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "1.2rem",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                width: "20%",
                textAlign: "center",
                borderBottom: "1px solid #000",
                borderRight: "1px solid #000",
                fontSize: "1.5rem",
                paddingBottom: "10px",
              }}
            >
              Topic
            </th>
            <th
              style={{
                width: "60%",
                borderBottom: "1px solid #000",
                borderRight: "1px solid #000",
                fontSize: "1.5rem",
                paddingBottom: "10px",
              }}
            >
              Explanation
            </th>
            <th
              style={{
                width: "20%",
                textAlign: "center",
                borderBottom: "1px solid #000",
                borderRight: "none", // No right border for the last column
                cursor: "pointer",
                fontSize: "1.5rem",
                paddingBottom: "10px",
              }}
              onClick={handleSort}
            >
              Name {sortDirection === "asc" ? "↑" : "↓"}
            </th>
          </tr>
        </thead>
        <tbody>
          {explanations.map((exp) => (
            <tr key={exp._id}>
              <td
                style={{
                  width: "20%",
                  textAlign: "center",
                  borderBottom: "1px solid #ccc",
                  borderRight: "1px solid #ccc",
                  padding: "10px",
                }}
              >
                {exp.topic}
              </td>
              <td
                style={{
                  width: "60%",
                  borderBottom: "1px solid #ccc",
                  borderRight: "1px solid #ccc",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                {/* Format explanation with bullet points and newline before last sentence */}
                {(() => {
                  const explanationParts = exp.explanation.split("•");
                  const sentences = explanationParts
                    .join("•")
                    .split(/(?<=[.!?])\s+/);

                  const lastSentence = sentences.pop(); // Remove the last sentence

                  return (
                    <>
                      {/* Display the explanation up to the last sentence */}
                      {sentences
                        .join(" ")
                        .split("•")
                        .map((line, index) => (
                          <span key={index}>
                            {index > 0 && "•"} {line.trim()}
                            <br />
                          </span>
                        ))}
                      {/* Add newline before the last sentence */}
                      {lastSentence.trim()} {/* Display the last sentence */}
                    </>
                  );
                })()}
              </td>
              <td
                style={{
                  width: "20%",
                  textAlign: "center",
                  borderBottom: "1px solid #ccc",
                  borderRight: "none",
                  padding: "10px",
                }}
              >
                {exp.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
