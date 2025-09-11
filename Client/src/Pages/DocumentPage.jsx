

import { useParams } from "react-router-dom";

export default function DocumentPage() {
  
  const { id } = useParams();

  // Mock doc (replace with API call)
  const doc = {
    _id: id,
    title: "Finance Audit",
    summary: "Audit findings reveal missing invoices and late payments.",
    keyFacts: ["Invoice delays", "Audit completed Aug 2025"],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">{doc.title}</h2>
      <p className="mb-4">{doc.summary}</p>

      <h3 className="text-xl font-semibold mb-2">Key Facts</h3>
      <ul className="list-disc pl-5">
        {doc.keyFacts.map((fact, i) => (
          <li key={i}>{fact}</li>
        ))}
      </ul>

      <a
        href={`/file/${doc._id}`}
        className="btn btn-primary mt-4"
      >
        View Original
      </a>
    </div>
  );
}
