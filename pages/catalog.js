import { useEffect, useState } from "react";

export default function Catalog() {
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
      <h1>Explanation Catalog</h1>
      <table>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Explanation</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {explanations.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.topic}</td>
              <td>{exp.explanation}</td>
              <td>{exp.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
