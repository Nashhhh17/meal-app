"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMealsByCategory, getCategories } from "@/lib/api";
import { MealSummary } from "@/types/meal";
import axios from "axios";

// Color palette
// --dusk-blue:   #3d5a80
// --powder-blue: #98c1d9
// --light-cyan:  #e0fbfc
// --burnt-peach: #ee6c4d
// --jet-black:   #293241

interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((res) => {
        setIngredients(res.data.meals || []);
      });
  }, []);

  const handleSelect = (name: string) => {
    setSelected(name);
    setLoading(true);
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(name)}`)
      .then((res) => {
        setMeals(res.data.meals || []);
        setLoading(false);
      });
  };

  const filtered = ingredients.filter((i) =>
    i.strIngredient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#e0fbfc" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #29324133", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#293241", marginBottom: 8 }}>Ingredients</h1>
          <p style={{ color: "#3d5a80", fontSize: 16 }}>Find meals by ingredient</p>
        </div>
      </div>

      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "32px 24px" }}>
        {/* Search Ingredient */}
        <input
          type="text"
          placeholder="Search ingredient... e.g. garlic, chicken"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%", maxWidth: 480, padding: "12px 20px",
            borderRadius: 12, border: "1px solid #29324133",
            fontSize: 14, marginBottom: 24, outline: "none",
            background: "#fff",
          }}
        />

        {/* Ingredient Grid */}
        {!selected && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12 }}>
            {filtered.slice(0, 100).map((ing) => (
              <button
                key={ing.idIngredient}
                onClick={() => handleSelect(ing.strIngredient)}
                style={{
                  background: "#fff", borderRadius: 12, padding: "16px 12px",
                  border: "1px solid #29324133", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                  transition: "box-shadow 0.2s",
                }}
              >
                <div style={{ position: "relative", width: 56, height: 56 }}>
                  <Image
                    src={`https://www.themealdb.com/images/ingredients/${ing.strIngredient}-Small.png`}
                    alt={ing.strIngredient}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="56px"
                  />
                </div>
                <span style={{ fontSize: 12, fontWeight: 500, color: "#293241", textAlign: "center" }}>
                  {ing.strIngredient}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Meals by Ingredient */}
        {selected && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <button
                onClick={() => { setSelected(""); setMeals([]); }}
                style={{
                  background: "none", border: "1px solid #29324133",
                  borderRadius: 8, padding: "6px 14px", cursor: "pointer",
                  fontSize: 13, color: "#3d5a80",
                }}
              >
                ← Back
              </button>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#293241" }}>
                Meals with <span style={{ color: "#ee6c4d" }}>{selected}</span>
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