import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-base-200 shadow">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          KMRL Docu-AI
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/search" className="btn btn-sm">Search</Link>
        <Link to="/upload" className="btn btn-sm">Upload</Link>
        <Link to="/inbox" className="btn btn-sm">Inbox</Link>
        <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
      </div>
    </div>
  );
}
