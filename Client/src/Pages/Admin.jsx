import { useNavigate } from "react-router-dom";

export default function AdminMainDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        ⚙️ Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Admin Upload Card */}
        <div
          className="card bg-base-200 shadow-xl hover:shadow-2xl cursor-pointer transition-transform hover:-translate-y-2"
          onClick={() => navigate("/admin/upload")}
        >
          <div className="card-body items-center text-center">
            <div className="text-5xl mb-4">📤</div>
            <h3 className="card-title">Admin Upload</h3>
            <p className="text-gray-600">
              Upload and manage important documents with progress tracking,
              duplicate checks, and history.
            </p>
          </div>
        </div>

        {/* Admin Executive Card */}
        <div
          className="card bg-base-200 shadow-xl hover:shadow-2xl cursor-pointer transition-transform hover:-translate-y-2"
          onClick={() => navigate("/admin/executive")}
        >
          <div className="card-body items-center text-center">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="card-title">Admin Executive</h3>
            <p className="text-gray-600">
              View, search, and filter executives. Track uploads, analyze data,
              and manage employees efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
