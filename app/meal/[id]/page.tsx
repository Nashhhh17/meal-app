import Image from "next/image";
import Link from "next/link";
import { getMealById } from "@/lib/api";
import { extractIngredients } from "@/types/meal";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Color palette
// --dusk-blue:   #3d5a80
// --powder-blue: #98c1d9
// --light-cyan:  #e0fbfc
// --burnt-peach: #ee6c4d
// --jet-black:   #293241

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meal = await getMealById(id);

  if (!meal) {
    return { title: "Meal not found | meal-app" };
  }

  const description = `Learn how to make ${meal.strMeal}, a ${meal.strArea} ${meal.strCategory} dish. Full ingredients list and step-by-step cooking instructions.`;

  return {
    title: `${meal.strMeal} Recipe | meal-app`,
    description,
    openGraph: {
      title: meal.strMeal,
      description,
      images: [{ url: meal.strMealThumb, width: 400, height: 400, alt: meal.strMeal }],
      type: "article",
    },
  };
}

export default async function MealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meal = await getMealById(id);

  if (!meal) return notFound();

  const ingredients = extractIngredients(meal);
  const tags = meal.strTags ? meal.strTags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const youtubeId = meal.strYoutube?.split("v=")[1] || null;

  return (
    <div style={{ minHeight: "100vh", background: "#e0fbfc" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>

        {/* Back Button */}
        <Link href="/food" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 14, color: "#3d5a80", textDecoration: "none",
          marginBottom: 24,
          padding: "8px 14px", borderRadius: 8,
          border: "1px solid #29324133", background: "#fff",
        }}>
          ← Back
        </Link>

        {/* Hero Card */}
        <div style={{
          background: "#fff", borderRadius: 24,
          overflow: "hidden", boxShadow: "0 2px 8px rgba(41,50,65,0.08)",
          marginBottom: 24,
        }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {/* Gambar */}
            <div style={{ position: "relative", width: "100%", maxWidth: 400, minHeight: 300, flexShrink: 0 }}>
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>

            {/* Info */}
            <div style={{ flex: 1, padding: "32px 28px", minWidth: 280 }}>
              {/* Tags kategori & area */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                <span style={{
                  background: "#ee6c4d", color: "#fff",
                  fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 100,
                }}>
                  {meal.strCategory}
                </span>
                <span style={{
                  background: "#ffffff", color: "#293241",
                  fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 100,
                }}>
                  {meal.strArea}
                </span>
              </div>

              {/* Nama */}
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#293241", lineHeight: 1.3, marginBottom: 16 }}>
                {meal.strMeal}
              </h1>

              {/* Tags */}
              {tags.length > 0 && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                  {tags.map((tag) => (
                    <span key={tag} style={{
                      background: "#e0fbfc", color: "#3d5a80",
                      fontSize: 12, padding: "3px 10px", borderRadius: 100,
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Link sumber */}
              {meal.strSource && (
                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block", fontSize: 13, color: "#ee6c4d",
                    textDecoration: "none", marginBottom: 8,
                  }}
                >
                  View original recipe →
                </a>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24, alignItems: "flex-start" }}>

          {/* Ingredients */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 1px 4px rgba(41,50,65,0.06)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#293241", marginBottom: 20 }}>
              Ingredients
              <span style={{ fontSize: 13, fontWeight: 400, color: "#3d5a8099", marginLeft: 8 }}>
                {ingredients.length} items
              </span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ingredients.map((ing) => (
                <div key={ing.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ position: "relative", width: 40, height: 40, flexShrink: 0, background: "#e0fbfc", borderRadius: 8 }}>
                    <Image
                      src={ing.thumb}
                      alt={ing.name}
                      fill
                      style={{ objectFit: "contain", padding: 4 }}
                      sizes="40px"
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#293241", margin: 0 }}>{ing.name}</p>
                    {ing.measure && (
                      <p style={{ fontSize: 12, color: "#3d5a8099", margin: 0 }}>{ing.measure}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 1px 4px rgba(41,50,65,0.06)" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#293241", marginBottom: 20 }}>
                Instructions
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {meal.strInstructions
                  .split("\n")
                  .filter((step) => step.trim())
                  .map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 14 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: "#e0fbfc", color: "#ee6c4d",
                        fontSize: 13, fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginTop: 2,
                      }}>
                        {i + 1}
                      </div>
                      <p style={{ fontSize: 14, color: "#293241", lineHeight: 1.7, margin: 0 }}>
                        {step.trim()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* YouTube Video */}
            {youtubeId && (
              <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 1px 4px rgba(41,50,65,0.06)" }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#293241", marginBottom: 16 }}>
                  🎬 Video Tutorial
                </h2>
                <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: 12, overflow: "hidden" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={meal.strMeal}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute", top: 0, left: 0,
                      width: "100%", height: "100%", border: "none",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}