import { useState, useEffect } from "react";

export default function AdminUploadDashboard() {
  const [file, setFile] = useState(null);
  const [source, setSource] = useState("drive");
  const [uploads, setUploads] = useState([
    {
      id: 1,
      name: "SafetyManual.pdf",
      status: "Completed",
      progress: 100,
      time: "2025-09-05 11:00 AM",
      source: "drive",
    },
  ]);
  const [uploading, setUploading] = useState(null);

  // Check if file already exists
  const checkDuplicate = (fileName) => {
    return uploads.some((u) => u.name.toLowerCase() === fileName.toLowerCase());
  };

  // Simulated upload process
  const startUpload = () => {
    if (!file) return alert("Please select a file!");
    if (checkDuplicate(file.name))
      return alert("This document already exists in the system!");

    const newUpload = {
      id: Date.now(),
      name: file.name,
      status: "Uploading",
      progress: 0,
      time: new Date().toLocaleString(),
      source,
    };

    setUploads([...uploads, newUpload]);
    setUploading(newUpload);
  };

  // Progress simulation
  useEffect(() => {
    if (uploading) {
      const interval = setInterval(() => {
        setUploads((prev) =>
          prev.map((u) =>
            u.id === uploading.id
              ? {
                  ...u,
                  progress: u.progress + 20,
                  status:
                    u.progress + 20 >= 100 ? "Completed" : "Uploading",
                }
              : u
          )
        );

        setUploading((prev) =>
          prev && prev.progress + 20 >= 100
            ? null
            : { ...prev, progress: prev.progress + 20 }
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [uploading]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📤 Admin Upload Dashboard</h2>

      {/* Upload Form */}
      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body">
          <h3 className="card-title">Upload New Document</h3>

          {/* Select Source */}
          <div className="mb-3">
            <label className="font-semibold">Select Source:</label>
            <div className="flex gap-4 mt-2">
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="radio"
                  name="source"
                  className="radio"
                  value="drive"
                  checked={source === "drive"}
                  onChange={() => setSource("drive")}
                />
                Internal Drive
              </label>
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="radio"
                  name="source"
                  className="radio"
                  value="scan"
                  checked={source === "scan"}
                  onChange={() => setSource("scan")}
                />
                Scanned Hard Copy
              </label>
            </div>
          </div>

          {/* File Input */}
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button className="btn btn-primary mt-3" onClick={startUpload}>
            Start Upload
          </button>
        </div>
      </div>

      {/* Upload History */}
      <h3 className="text-lg font-semibold mb-2">My Upload History</h3>
      <div className="overflow-x-auto bg-base-200 shadow rounded-xl">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Document Name</th>
              <th>Source</th>
              <th>Upload Time</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Time Left</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>
                  <span className="badge badge-info uppercase">{u.source}</span>
                </td>
                <td>{u.time}</td>
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
                <td>
                  {u.status === "Completed"
                    ? "0s"
                    : `${Math.ceil((100 - u.progress) / 20)}s`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
