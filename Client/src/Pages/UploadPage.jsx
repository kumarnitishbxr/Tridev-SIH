


import { useState } from "react";

export default function UploadPage() {
  
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return alert("Choose a file first!");
    // Replace with actual API call
    alert(`File "${file.name}" uploaded successfully!`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Upload Document</h2>
          <input
            type="file"
            className="file-input file-input-bordered w-full mt-3"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="btn btn-primary mt-4"
            onClick={handleUpload}
          >
            Upload & Process
          </button>
        </div>
      </div>
    </div>
  );
}
