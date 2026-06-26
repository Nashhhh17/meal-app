import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#111827", color: "#9ca3af", marginTop: 80 }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}></span>
              <span style={{ fontWeight: 700, fontSize: 20, color: "#fff" }}>MealApp</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7 }}>
              Discover recipes from around the world. Powered by TheMealDB.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{ color: "#fff", fontWeight: 600, marginBottom: 16, fontSize: 15 }}>Pages</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/", label: "Home" },
                { href: "/food", label: "Food" },
                { href: "/ingredients", label: "Ingredients" },
                { href: "/local-culinary", label: "Local Culinary" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ fontSize: 14, color: "#9ca3af", textDecoration: "none" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* API Credit */}
          <div>
            <h3 style={{ color: "#fff", fontWeight: 600, marginBottom: 16, fontSize: 15 }}>Data Source</h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
              All recipes provided by TheMealDB free API.
            </p>
            <a
              href="https://www.themealdb.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 14, color: "#f97316", textDecoration: "none" }}
            >
              themealdb.com →
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div style={{
          borderTop: "1px solid #1f2937", marginTop: 48, paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontSize: 13 }}>
            © {new Date().getFullYear()} MealApp by Nashrulloh Qorib. Built with Next.js & TheMealDB API.
          </p>
          <a
            href="https://www.themealdb.com/api.php"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, color: "#f97316", textDecoration: "none" }}
          >
            API Docs →
          </a>
        </div>
      </div>
    </footer>
  );
}