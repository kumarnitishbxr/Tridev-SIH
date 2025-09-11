import Navbar from "../Components/Navbar";


import { useState } from "react";
import DocumentCard from "../Components/DocumentCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Mock data (replace with API call later)
    setResults([
      { 
        _id: "1", 
        title: "Safety Report", 
        summary: "Key safety updates for metro operations..." 
      },
      { 
        _id: "2", 
        title: "Finance Audit", 
        summary: "Audit findings with compliance risks..." 
      }
    ]);
  };

  return (
    <>

    <Navbar/>
    <div className="p-6 max-w-6xl mx-auto">
      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          className="input input-bordered w-full"
          placeholder="Search documents..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Results */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {results.map((doc) => (
          <DocumentCard key={doc._id} doc={doc} />
        ))}
      </div>
    </div>
    </>
  );
}
