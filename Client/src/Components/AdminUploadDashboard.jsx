import { useState, useEffect } from "react";
import { Upload, HardDrive, Scan } from "lucide-react";


export default function AdminUploadDashboard() {
  const [file, setFile] = useState(null);
  const [source, setSource] = useState("drive");
  const [uploads, setUploads] = useState([]);
  const [uploading, setUploading] = useState(null);

  // Check if file already exists
  const checkDuplicate = (fileName) => {
    return uploads.some((u) => u.name.toLowerCase() === fileName.toLowerCase());
  };

  // Start upload
  const startUpload = () => {
    if (!file) return alert("Please select a file!");
    if (checkDuplicate(file.name))
      return alert("This document already exists in the system!");

    const newUpload = {
      id: Date.now(),
      name: file.name,
      source,
      progress: 0,
      status: "Uploading",
      time: new Date().toLocaleString(),
    };
    setUploads([...uploads, newUpload]);
    setUploading(newUpload);
  };

  // Simulate progress
  useEffect(() => {
    if (uploading) {
      const interval = setInterval(() => {
        setUploads((prev) =>
          prev.map((u) =>
            u.id === uploading.id
              ? {
                  ...u,
                  progress: u.progress + 25,
                  status:
                    u.progress + 25 >= 100 ? "Completed" : "Uploading",
                }
              : u
          )
        );

        setUploading((prev) =>
          prev && prev.progress + 25 >= 100
            ? null
            : { ...prev, progress: prev.progress + 25 }
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [uploading]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">📤 Admin Upload Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Upload New Document</h3>

            {/* Upload Source */}
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setSource("drive")}
                className={`btn w-1/2 ${
                  source === "drive" ? "btn-primary" : "btn-outline"
                }`}
              >
                <HardDrive size={18} /> Internal Drive
              </button>
              <button
                onClick={() => setSource("scan")}
                className={`btn w-1/2 ${
                  source === "scan" ? "btn-primary" : "btn-outline"
                }`}
              >
                <Scan size={18} /> Scanned Copy
              </button>
            </div>

            {/* File Input */}
            <input
              type="file"
              className="file-input file-input-bordered w-full mb-4"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button className="btn btn-success w-full" onClick={startUpload}>
              <Upload size={18} /> Start Upload
            </button>
          </div>
        </div>

        {/* Upload Tracker */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Upload Tracker</h3>
            {uploads.length === 0 ? (
              <p className="text-gray-500">No uploads yet.</p>
            ) : (
              <div className="space-y-4">
                {uploads.map((u) => (
                  <div
                    key={u.id}
                    className="p-3 rounded-lg bg-base-100 shadow"
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold">{u.name}</span>
                      <span
                        className={`badge ${
                          u.status === "Completed"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {u.status}
                      </span>
                    </div>
                    <progress
                      className="progress progress-primary w-full mt-2"
                      value={u.progress}
                      max="100"
                    ></progress>
                    <div className="text-sm text-gray-500 flex justify-between mt-1">
                      <span>{u.source.toUpperCase()}</span>
                      <span>{u.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
