import { useState, useEffect } from "react";

export default function ExplanationsPage() {
  const [explanations, setExplanations] = useState([]);

  useEffect(() => {
    const fetchExplanations = async () => {
      const res = await fetch("/api/explanations");
      const data = await res.json();
      setExplanations(data);
    };

    fetchExplanations();
  }, []);

  return (
    <div>
      <h1>Explanations</h1>
      <ul>
        {explanations.map((explanation) => (
          <li key={explanation._id}>
            <strong>{explanation.name}:</strong> {explanation.explanation}
          </li>
        ))}
      </ul>
    </div>
  );
}
