"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/food", label: "Food" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/local-culinary", label: "Local Culinary" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "#fff", borderBottom: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    }}>
      <div style={{
        maxWidth: 1152, margin: "0 auto", padding: "0 24px",
        height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <span style={{ fontSize: 24 }}></span>
          <span style={{ fontWeight: 700, fontSize: 20, color: "#f97316" }}>MealApp</span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "8px 16px", borderRadius: 8,
                fontSize: 14, fontWeight: 500, textDecoration: "none",
                background: pathname === link.href ? "#fff7ed" : "transparent",
                color: pathname === link.href ? "#f97316" : "#6b7280",
                transition: "all 0.15s",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger — hanya mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            padding: 8, background: "none",
            border: "none", cursor: "pointer", flexDirection: "column", gap: 4,
          }}
          className="hamburger"
        >
          <div style={{ width: 20, height: 2, background: "#6b7280", borderRadius: 2 }} />
          <div style={{ width: 20, height: 2, background: "#6b7280", borderRadius: 2 }} />
          <div style={{ width: 20, height: 2, background: "#6b7280", borderRadius: 2 }} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div style={{
          borderTop: "1px solid #f3f4f6", background: "#fff",
          padding: "12px 24px", display: "flex", flexDirection: "column", gap: 4,
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "10px 16px", borderRadius: 8,
                fontSize: 14, fontWeight: 500, textDecoration: "none",
                background: pathname === link.href ? "#fff7ed" : "transparent",
                color: pathname === link.href ? "#f97316" : "#6b7280",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}