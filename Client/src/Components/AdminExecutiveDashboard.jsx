import { useState } from "react";

export default function AdminExecutiveDashboard() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");

  const executives = [
    { id: 1, name: "Priti Singh", department: "Manager", role: "Executive" },
    { id: 2, name: "Nitish Kumar", department: "Maintenance", role: "Executive" },
    { id: 3, name: "John Smith", department: "Maintenance", role: "Executive" },
    { id: 4, name: "David Johnson", department: "Legal", role: "Executive" },
    { id: 5, name: "Michael Brown", department: "Human Resource", role: "Executive" },
    { id: 6, name: "James Wilson", department: "Audit", role: "Executive" },
    { id: 7, name: "Robert Taylor", department: "Operations", role: "Executive" },
    { id: 8, name: "William Anderson", department: "Research", role: "Executive" },
    { id: 9, name: "Charles Thomas", department: "IT", role: "Executive" },
    { id: 10, name: "Thomas Harris", department: "Finance", role: "Executive" },
  ];


  const uploads = [
    
    { id: 1, employee: "Priti Singh", docName: "SafetyReport.pdf", department: "Managament", status: "Completed", progress: 100, time: "2025-09-06 10:15 AM" },
    { id: 2, employee: "Nitish Kumar", docName: "PassengerSurvey.xlsx", department: "Operations", status: "Processing", progress: 60, time: "2025-09-07 09:30 AM" },
    { id: 3, employee: "Daniel Lewis", docName: "FinanceSummary.docx", department: "Finance", status: "Completed", progress: 100, time: "2025-09-07 08:20 AM" },
    { id: 4, employee: "John Smith", docName: "MaintenanceChecklist.docx", department: "Maintenance", status: "Uploading", progress: 40, time: "2025-09-07 11:45 AM" },
    { id: 5, employee: "David Johnson", docName: "LegalCompliance.pdf", department: "Legal", status: "Completed", progress: 100, time: "2025-09-06 04:20 PM" },
    { id: 6, employee: "Michael Brown", docName: "HRGuidelines.pdf", department: "Human Resource", status: "Processing", progress: 70, time: "2025-09-07 02:30 PM" },
    { id: 7, employee: "James Wilson", docName: "AuditChecklist.docx", department: "Audit", status: "Uploading", progress: 25, time: "2025-09-07 03:10 PM" },
    { id: 8, employee: "Robert Taylor", docName: "OperationsUpdate.pdf", department: "Operations", status: "Completed", progress: 100, time: "2025-09-06 09:40 AM" },
    { id: 9, employee: "William Anderson", docName: "ResearchNotes.docx", department: "Research", status: "Processing", progress: 55, time: "2025-09-07 12:00 PM" },
    { id: 10, employee: "Charles Thomas", docName: "TechSpecs.pdf", department: "IT", status: "Completed", progress: 100, time: "2025-09-05 06:30 PM" },

  ];

  // Filtering logic
  const filteredExecutives = executives.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || e.role === roleFilter;
    const matchDept = deptFilter === "All" || e.department === deptFilter;
    return matchSearch && matchRole && matchDept;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">👥 Executive Management Dashboard</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          className="input input-bordered w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/4"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option>All</option>
          <option>Manager</option>
          <option>Operator</option>
          <option>Finance</option>
          <option>Analyst</option>
          <option>Technician</option>
          <option>HR</option>
          <option>Legal</option>
          <option>Data Entry</option>
          <option>Auditor</option>
          <option>Executive</option>
        </select>

        <select
          className="select select-bordered w-full md:w-1/4"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        >
          <option>All</option>
          <option>Safety</option>
          <option>Operations</option>
          <option>Finance</option>
          <option>Research</option>
          <option>Maintenance</option>
          <option>Human Resource</option>
          <option>Legal</option>
          <option>Administration</option>
          <option>Audit</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Executive List */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Executives</h3>
            <ul className="space-y-3 max-h-[400px] overflow-y-auto">
              {filteredExecutives.length === 0 ? (
                <p className="text-gray-500">No executives found.</p>
              ) : (
                filteredExecutives.map((e) => (
                  <li
                    key={e.id}
                    className="p-3 rounded-lg bg-base-100 shadow flex justify-between"
                  >
                    <div>
                      <p className="font-semibold">{e.name}</p>
                      <p className="text-sm text-gray-500">{e.email}</p>
                      <p className="text-xs text-gray-400 ">{e.department}</p>
                    </div>
                    <span className="badge badge-info">{e.role}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Upload Analytics */}
        <div className="card bg-base-200 shadow-xl col-span-2">
          <div className="card-body">
            <h3 className="card-title">Upload Tracking</h3>
            <div className="overflow-x-auto space-y-3 max-h-[400px] overflow-y-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Document</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {uploads.map((u) => (
                    <tr key={u.id}>
                      <td>{u.employee}</td>
                      <td>{u.docName}</td>
                      <td><span className="badge badge-info">{u.department}</span></td>
                      <td>
                        <span
                          className={`badge ${
                            u.status === "Completed"
                              ? "badge-success"
                              : "badge-warning"
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
                      <td>{u.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
