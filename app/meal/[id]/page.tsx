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
        <Link href="/food" 
          className="inline-flex items-center gap-1.5 text-sm text-dusk-blue no-underline mb-6 px-3.5 py-2 rounded-lg border border-jet-black/20 bg-white"
        >
          ← Back
        </Link>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_2px_8px_rgba(41,50,65,0.08)] mb-6">

          <div className="flex flex-wrap">
            {/* Gambar */}
            <div className="relative w-full max-w-[400px] min-h-[300px] shrink-0">
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
            <div className="flex-1 px-7 py-8 min-w-[280px]">
              {/* Tags kategori & area */}
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="bg-burnt-peach text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {meal.strCategory}
                </span>
                <span className="bg-white text-jet-black text-xs font-semibold px-3 py-1 rounded-full">
                  {meal.strArea}
                </span>
              </div>

              {/* Nama */}
              <h1 className="text-[28px] font-extrabold text-jet-black leading-tight mb-4">
                {meal.strMeal}
              </h1>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap mb-5">
                  {tags.map((tag) => (
                    <span key={tag} 
                      className="bg-light-cyan text-dusk-blue text-xs px-2.5 py-[3px] rounded-full"
                    >
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
                  className="inline-block text-[13px] text-burnt-peach no-underline mb-2"
                >
                  View original recipe →
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_2fr] gap-6 items-start">

          {/* Ingredients */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_1px_4px_rgba(41,50,65,0.06)]">
            <h2 className="text-lg font-bold text-jet-black mb-5">
              Ingredients
              <span className="text-[13px] font-normal text-dusk-blue/60 ml-2">
                {ingredients.length} items
              </span>
            </h2>
            <div className="flex flex-col gap-3">
              {ingredients.map((ing) => (
                <div key={ing.name} className="flex items-center gap-3">
                  <div className="relative w-10 h-10 shrink-0 bg-light-cyan rounded-lg">
                    <Image
                      src={ing.thumb}
                      alt={ing.name}
                      fill
                      className="object-contain p-1"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-jet-black m-0">{ing.name}</p>
                    {ing.measure && (
                      <p className="text-xs text-dusk-blue/60 m-0">{ing.measure}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[20px] p-6 shadow-[0_1px_4px_rgba(41,50,65,0.06)]">
              <h2 className="text-lg font-bold text-jet-black mb-5">
                Instructions
              </h2>
              <div className="flex flex-col gap-4">
                {meal.strInstructions
                  .split("\n")
                  .filter((step) => step.trim())
                  .map((step, i) => (
                    <div key={i} className="flex gap-3.5">
                      <div 
                        className="w-7 h-7 rounded-full bg-light-cyan 
                        text-burnt-peach text-[13px] font-bold flex items-center 
                        justify-center shrink-0 mt-0.5"
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm text-jet-black leading-relaxed m-0">
                        {step.trim()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* YouTube Video */}
            {youtubeId && (
              <div className="bg-white rounded-[20px] p-6 shadow-[0_1px_4px_rgba(41,50,65,0.06)]">
                <h2 className="text-lg font-bold text-jet-black mb-4">
                  🎬 Video Tutorial
                </h2>
                <div className="relative pb-[56.25%] rounded-xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={meal.strMeal}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full border-0"
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