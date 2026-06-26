"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCategories, getMealsByCategory, searchMeals } from "@/lib/api";
import { Category, MealSummary } from "@/types/meal";

// Color palette
// --dusk-blue:   #3d5a80
// --powder-blue: #98c1d9
// --light-cyan:  #e0fbfc
// --burnt-peach: #ee6c4d
// --jet-black:   #293241

export default function FoodPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory = searchParams.get("category") || "Beef";
  const searchQuery = searchParams.get("search") || "";

  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (searchQuery) {
      searchMeals(searchQuery).then((data) => {
        setMeals(data);
        setLoading(false);
      });
    } else {
      getMealsByCategory(selectedCategory).then((data) => {
        setMeals(data);
        setLoading(false);
      });
    }
  }, [selectedCategory, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      router.push(`/food?search=${encodeURIComponent(localSearch.trim())}`);
    } else {
      router.push(`/food?category=${selectedCategory}`);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#e0fbfc" }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #29324133", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#293241", marginBottom: 8 }}>
            Food
          </h1>
          <p style={{ color: "#3d5a80", fontSize: 16, marginBottom: 20 }}>
            Browse meals by category or search by name
          </p>

          {/* Search bar di page food */}
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, maxWidth: 480 }}>
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search meals... e.g. chicken, pasta"
              style={{
                flex: 1, padding: "10px 16px", borderRadius: 10,
                border: "1px solid #29324133", fontSize: 14, outline: "none",
                background: "#e0fbfc",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px", borderRadius: 10,
                background: "#ee6c4d", color: "#fff",
                border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}
            >
              Search
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch("");
                  router.push(`/food?category=${selectedCategory}`);
                }}
                style={{
                  padding: "10px 16px", borderRadius: 10,
                  background: "#e0fbfc", color: "#3d5a80",
                  border: "1px solid #29324133", fontSize: 14, cursor: "pointer",
                }}
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </div>

      <div style={{
        maxWidth: 1152, margin: "0 auto", padding: "32px 24px",
        display: "flex", gap: 32, alignItems: "flex-start",
      }}>

        {/* Sidebar Kategori */}
        <aside style={{
          width: 200, flexShrink: 0, background: "#fff",
          borderRadius: 16, border: "1px solid #29324133",
          overflow: "hidden", position: "sticky", top: 80,
        }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #29324133" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#3d5a80", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Categories
            </p>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.idCategory}
              onClick={() => router.push(`/food?category=${encodeURIComponent(cat.strCategory)}`)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "11px 16px", width: "100%", textAlign: "left",
                border: "none", borderBottom: "1px solid #e0fbfc", cursor: "pointer",
                background: cat.strCategory === selectedCategory && !searchQuery ? "#e0fbfc" : "#fff",
                color: cat.strCategory === selectedCategory && !searchQuery ? "#ee6c4d" : "#293241",
                fontSize: 14, fontWeight: 500,
              }}
            >
              <div style={{ position: "relative", width: 28, height: 28, flexShrink: 0 }}>
                <Image
                  src={cat.strCategoryThumb}
                  alt={cat.strCategory}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="28px"
                />
              </div>
              {cat.strCategory}
            </button>
          ))}
        </aside>

        {/* Meals Grid */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#293241", marginBottom: 20 }}>
            {searchQuery ? (
              <>
                Results for <span style={{ color: "#ee6c4d" }}>"{searchQuery}"</span>
              </>
            ) : selectedCategory}
            {!loading && (
              <span style={{ fontSize: 14, fontWeight: 400, color: "#3d5a8099", marginLeft: 8 }}>
                {meals.length} meals
              </span>
            )}
          </h2>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, overflow: "hidden" }}>
                  <div style={{ height: 160, background: "#e0fbfc" }} />
                  <div style={{ padding: 14 }}>
                    <div style={{ height: 14, background: "#e0fbfc", borderRadius: 6, width: "80%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : meals.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ fontSize: 48, marginBottom: 16 }}></p>
              <p style={{ fontSize: 18, fontWeight: 600, color: "#293241", marginBottom: 8 }}>
                No meals found
              </p>
              <p style={{ fontSize: 14, color: "#3d5a80" }}>
                Try a different search or browse by category
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
              {meals.map((meal) => (
                <Link key={meal.idMeal} href={`/meal/${meal.idMeal}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "#fff", borderRadius: 16, overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(41,50,65,0.08)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}>
                    <div style={{ position: "relative", height: 160, width: "100%" }}>
                      <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div style={{ padding: "12px 14px" }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#293241", lineHeight: 1.4 }}>
                        {meal.strMeal}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}