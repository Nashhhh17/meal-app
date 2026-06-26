"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAreas, getMealsByArea } from "@/lib/api";
import { Area, MealSummary } from "@/types/meal";

// Color palette
// --dusk-blue:   #3d5a80
// --powder-blue: #98c1d9
// --light-cyan:  #e0fbfc
// --burnt-peach: #ee6c4d
// --jet-black:   #293241

const areaFlags: Record<string, string> = {
  American: "", British: "", Canadian: "", Chinese: "",
  Croatian: "", Dutch: "", Egyptian: "", Filipino: "",
  French: "", Greek: "", Indian: "", Irish: "",
  Italian: "", Jamaican: "", Japanese: "", Kenyan: "",
  Malaysian: "", Mexican: "", Moroccan: "", Polish: "",
  Portuguese: "", Russian: "", Spanish: "", Thai: "",
  Tunisian: "", Turkish: "", Ukrainian: "", Unknown: "",
  Vietnamese: "",
};

export default function LocalCulinaryPage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAreas().then(setAreas);
  }, []);

  const handleSelect = (area: string) => {
    setSelected(area);
    setLoading(true);
    getMealsByArea(area).then((data) => {
      setMeals(data);
      setLoading(false);
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e0fbfc" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #29324133", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#293241", marginBottom: 8 }}>Local Culinary</h1>
          <p style={{ color: "#3d5a80", fontSize: 16 }}>Explore traditional dishes from around the world</p>
        </div>
      </div>

      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "32px 24px" }}>
        {/* Area Grid */}
        {!selected && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
            {areas.map((area) => (
              <button
                key={area.strArea}
                onClick={() => handleSelect(area.strArea)}
                style={{
                  background: "#3d5a80", borderRadius: 16, padding: "12px 8px",
                  border: "none", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
                  boxShadow: "0 1px 3px rgba(41,50,65,0.08)",
                  transition: "box-shadow 0.2s",
                  width: "100%", textAlign: "center",
                }}
              >
                <span style={{ fontSize: 40 }}>{areaFlags[area.strArea]}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", textAlign: "center" }}>{area.strArea}</span>
              </button>
            ))}
          </div>
        )}

        {/* Meals by Area */}
        {selected && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <button
                onClick={() => { setSelected(""); setMeals([]); }}
                style={{
                  background: "#e0fbfc", border: "1px solid #29324133", borderRadius: 8,
                  padding: "6px 14px", cursor: "pointer", fontSize: 13, color: "#3d5a80",
                }}
              >
                ← Back
              </button>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#293241" }}>
                {areaFlags[selected]} {selected} Cuisine
                {!loading && (
                  <span style={{ fontSize: 14, fontWeight: 400, color: "#3d5a8099", marginLeft: 8 }}>
                    {meals.length} meals
                  </span>
                )}
              </h2>
            </div>

            {loading ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ height: 160, background: "#e0fbfc" }} />
                    <div style={{ padding: 14 }}>
                      <div style={{ height: 14, background: "#e0fbfc", borderRadius: 6 }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
                {meals.map((meal) => (
                  <Link key={meal.idMeal} href={`/meal/${meal.idMeal}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      background: "#fff", borderRadius: 16, overflow: "hidden",
                      boxShadow: "0 1px 3px rgba(41,50,65,0.08)",
                    }}>
                      <div style={{ position: "relative", height: 160 }}>
                        <Image src={meal.strMealThumb} alt={meal.strMeal} fill style={{ objectFit: "cover" }} sizes="25vw" />
                      </div>
                      <div style={{ padding: "12px 14px" }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#293241", lineHeight: 1.4 }}>{meal.strMeal}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}