








export default function DocumentCard({ doc }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
      <div className="card-body">
        <h2 className="card-title">{doc.title}</h2>
        <p className="line-clamp-3 text-sm opacity-80">{doc.summary}</p>
        <div className="card-actions justify-end">
          <a href={`/doc/${doc._id}`} className="btn btn-sm btn-outline">
            Open
          </a>
        </div>
      </div>
    </div>
  );
}
