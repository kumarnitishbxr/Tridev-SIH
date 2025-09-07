import { useState } from "react";

export default function AdminExecutiveDashboard() {
  const [executives] = useState([
    { id: 1, name: "Priti Singh", role: "Manager", email: "samir@kmrl.com" },
    { id: 2, name: "Devendra", role: "Operator", email: "priti@kmrl.com" },
    { id: 3, name: "Nitish Kumar", role: "Finance", email: "nitish@kmrl.com" },
    { id: 4, name: "John Doe", role: "Operator", email: "john@kmrl.com" },
    { id: 5, name: "Issac Night", role: "Finance", email: "night@kmrl.com" },
  ]);

  const [uploads, setUploads] = useState([
    {
      id: 1,
      employee: "Priti Singh",
      docName: "MetroSafetyReport.pdf",
      department: "Safety",
      status: "Completed",
      progress: 100,
      time: "2025-09-06 10:15 AM",
    },
    {
      id: 2,
      employee: "John Doe",
      docName: "PassengerSurvey.xlsx",
      department: "Operations",
      status: "Pending",
      progress: 60,
      time: "2025-09-02 09:30 AM",
    },
    {
      id: 3,
      employee: "Nitish Kumar",
      docName: "FinanceAudit.docx",
      department: "Finance",
      status: "Processing",
      progress: 39,
      time: "2025-09-06 11:00 AM",
    },
    {
      id: 4,
      employee: "Issac Night",
      docName: "Construction.docx",
      department: "Construction",
      status: "Completed",
      progress: 100,
      time: "2025-09-07 8:00 AM",
    },
    {
      id: 5,
      employee: "Albert",
      docName: "FinanceAudit.docx",
      department: "Finance",
      status: "Pending",
      progress: 18,
      time: "2025-09-01 3:00 AM",
    },
  ]);

  const [filter, setFilter] = useState("All");

  // Filter uploads
  const filteredUploads =
    filter === "All"
      ? uploads
      : uploads.filter((u) => u.department === filter);

  // Analytics summary
  const totalUploads = uploads.length;
  const completed = uploads.filter((u) => u.status === "Completed").length;
  const processing = uploads.filter((u) => u.status === "Processing").length;
  const pending = uploads.filter((u) => u.status === "Pending").length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        👥 Executive Monitoring & Document Dashboard
      </h2>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="stat bg-base-200 shadow rounded-xl">
          <div className="stat-title">Total Uploads</div>
          <div className="stat-value">{totalUploads}</div>
        </div>
        <div className="stat bg-green-900 shadow rounded-xl">
          <div className="stat-title">Completed</div>
          <div className="stat-value">{completed}</div>
        </div>
        <div className="stat bg-sky-900 shadow rounded-xl">
          <div className="stat-title">Processing</div>
          <div className="stat-value">{processing}</div>
        </div>
        <div className="stat bg-red-800 shadow rounded-xl">
          <div className="stat-title">Pending</div>
          <div className="stat-value">{pending}</div>
        </div>
      </div>

      {/* Filter by Department */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Department:</label>
        <select
          className="select select-bordered"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Safety</option>
          <option>Finance</option>
          <option>Operations</option>
        </select>
      </div>

      {/* Upload History Table */}
      <div className="overflow-x-auto bg-base-200 shadow rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Document</th>
              <th>Department</th>
              <th>Upload Time</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {filteredUploads.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td>{u.employee}</td>
                <td>{u.docName}</td>
                <td>
                  <span className="badge badge-info">{u.department}</span>
                </td>
                <td>{u.time}</td>
                <td>
                  <span
                    className={`badge ${
                      u.status === "Completed"
                        ? "badge-success"
                        : u.status === "Processing"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td>
                  <progress
                    className="progress progress-primary w-32"
                    value={u.progress}
                    max="100"
                  ></progress>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
