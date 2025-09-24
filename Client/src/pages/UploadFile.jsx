import { useState, useEffect } from "react";
import { Upload, HardDrive, Scan } from "lucide-react";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [source, setSource] = useState("drive");
  const [uploads, setUploads] = useState([]);
  const [uploading, setUploading] = useState(null);

  // Check if file already exists
  const checkDuplicate = (fileName) =>
    uploads.some((u) => u.name.toLowerCase() === fileName.toLowerCase());

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


  //Handle upload

  

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
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        📤 Admin Upload Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="rounded-xl bg-white shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Upload New Document
          </h3>

          {/* Upload Source */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setSource("drive")}
              className={`flex items-center justify-center gap-2 w-1/2 px-4 py-2 rounded-lg font-medium transition ${
                source === "drive"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <HardDrive size={18} /> Internal Drive
            </button>
            <button
              onClick={() => setSource("scan")}
              className={`flex items-center justify-center gap-2 w-1/2 px-4 py-2 rounded-lg font-medium transition ${
                source === "scan"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <Scan size={18} /> Scanned Copy
            </button>
          </div>

          {/* File Input */}
          <input
            type="file"
            className="block w-full text-sm text-gray-700 
                       file:mr-4 file:py-2 file:px-4 file:rounded-lg 
                       file:border-0 file:text-sm file:font-medium 
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={startUpload}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 
                       text-white font-medium py-2 px-4 rounded-lg transition"
          >
            <Upload size={18} /> Start Upload
          </button>
        </div>





        {/* Upload Tracker */}
        <div className="rounded-xl bg-white shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Upload Tracker
          </h3>
          {uploads.length === 0 ? (
            <p className="text-gray-500 text-sm">No uploads yet.</p>
          ) : (
            <div className="space-y-4">
              {uploads.map((u) => (
                <div
                  key={u.id}
                  className="p-4 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{u.name}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        u.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {u.status}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        u.status === "Completed"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${u.progress}%` }}
                    />
                  </div>

                  <div className="text-xs text-gray-500 flex justify-between mt-2">
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
  );
}
