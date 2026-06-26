"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/food?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{ display: "flex", gap: 8, width: "100%", maxWidth: 520, margin: "0 auto" }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search meals... e.g. chicken, pasta"
        style={{
          flex: 1, padding: "14px 20px", borderRadius: 12,
          border: "1px solid #e5e7eb", background: "#fff",
          fontSize: 14, outline: "none",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "14px 24px", borderRadius: 12,
          background: "#f97316", color: "#fff",
          border: "none", fontSize: 14, fontWeight: 600,
          cursor: "pointer", whiteSpace: "nowrap",
        }}
      >
        Search
      </button>
    </form>
  );
}