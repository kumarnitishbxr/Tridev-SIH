

export default function InboxPage() {
  const docs = [
    { _id: "3", title: "Regulatory Update", summary: "New compliance rules effective from Sept 2025..." },
    { _id: "4", title: "Maintenance Log", summary: "Daily maintenance checks completed..." }
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📥 My Inbox</h2>
      <div className="grid gap-4">
        {docs.map((d) => (
          <div key={d._id} className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">{d.title}</h2>
              <p>{d.summary}</p>
              <div className="card-actions justify-end">
                <a href={`/doc/${d._id}`} className="btn btn-sm btn-outline">
                  Open
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
