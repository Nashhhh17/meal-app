import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/ui/SearchBar";
import { FaBowlFood } from "react-icons/fa6";
import { getRandomMeal } from "@/lib/api";

// Color palette
// --dusk-blue:   #3d5a80
// --powder-blue: #98c1d9
// --light-cyan:  #e0fbfc
// --burnt-peach: #ee6c4d
// --jet-black:   #293241

export default async function HomePage() {
  const randomMeal = await getRandomMeal();

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(135deg, #e0fbfc 0%, #98c1d933 50%, #e0fbfc 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}>
        <div style={{ maxWidth: 680, width: "100%", textAlign: "center" }}>

          {/* Badge */}
          <div style={{
            display: "inline-block",
            background: "#e0fbfc",
            border: "1px solid #98c1d9",
            color: "#ee6c4d",
            fontSize: 13,
            fontWeight: 500,
            padding: "6px 16px",
            borderRadius: 100,
            marginBottom: 24,
          }}>
            Recipes from around the world
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontWeight: 800,
            color: "#293241",
            lineHeight: 1.15,
            marginBottom: 20,
          }}>
            Discover & Cook <br />
            <span style={{ color: "#ee6c4d" }}>Delicious Meals</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 18,
            color: "#3d5a80",
            lineHeight: 1.7,
            maxWidth: 480,
            margin: "0 auto 40px",
          }}>
            Explore thousands of recipes, browse by ingredients,
            and discover local culinary from every corner of the world.
          </p>

          {/* Search Bar */}
          <SearchBar />

          {/* Quick Links */}
          <div style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 32,
          }}>
            <Link href="/food" style={{
              padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 500,
              background: "#ee6c4d", color: "#fff", textDecoration: "none",
            }}>
              Browse Food
            </Link>
            <Link href="/ingredients" style={{
              padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 500,
              background: "#fff", color: "#293241", textDecoration: "none",
              border: "1px solid #98c1d9",
            }}>
              By Ingredient
            </Link>
            <Link href="/local-culinary" style={{
              padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 500,
              background: "#fff", color: "#293241", textDecoration: "none",
              border: "1px solid #98c1d9",
            }}>
              Local Culinary
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex",
            gap: 48,
            justifyContent: "center",
            marginTop: 64,
            flexWrap: "wrap",
          }}>
            {[
              { num: "300+", label: "Recipes" },
              { num: "14+", label: "Categories" },
              { num: "25+", label: "Countries" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#3d5a80" }}>{stat.num}</div>
                <div style={{ fontSize: 13, color: "#98c1d9", marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* About this website */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 40,
            alignItems: "start",
          }}>
            <div>
              <div style={{ fontSize: 28, marginBottom: 8, color: "#ee6c4d" }}><FaBowlFood /></div>
              <h2 style={{
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                fontWeight: 800,
                color: "#293241",
                lineHeight: 1.2,
              }}>
                The Introduction
              </h2>
            </div>

            <div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#293241", marginBottom: 12 }}>
                About this website
              </h3>
              <p style={{ fontSize: 15, color: "#3d5a80", lineHeight: 1.8, marginBottom: 28 }}>
                Hi, welcome to MealApp! This website is built on top of TheMealDB API and lets you
                explore recipes from all over the world. Browse by category, search by ingredient,
                or dive into local culinary traditions from different countries — everything you
                need to find your next favorite dish is right here.
              </p>

              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#293241", marginBottom: 12 }}>
                What is MealApp?
              </h3>
              <p style={{ fontSize: 15, color: "#3d5a80", lineHeight: 1.8 }}>
                MealApp is a Frontend Website that display a food's content, including foods category,
                foods country area, ingredients, and cooking steps with a video. Thanks for
                watching my website. Hope you glad. Do what you love and so many reasons to be happy.
              </p>
            </div>
          </div>

          {/* Did you know */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 40,
            alignItems: "center",
            marginTop: 64,
          }}>

            {/* Gambar dari API */}
            {randomMeal ? (
              <Link href={`/meal/${randomMeal.idMeal}`} style={{ textDecoration: "none" }}>
                <div style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  aspectRatio: "4 / 3",
                  position: "relative",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}>
                  <Image
                    src={randomMeal.strMealThumb}
                    alt={randomMeal.strMeal}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  {/* Overlay nama meal */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(transparent, rgba(41,50,65,0.85))",
                    padding: "32px 16px 16px",
                  }}>
                    <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, margin: 0 }}>
                      {randomMeal.strMeal}
                    </p>
                    <p style={{ color: "#98c1d9", fontSize: 11, margin: "4px 0 0" }}>
                      {randomMeal.strArea} · {randomMeal.strCategory}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <div style={{
                borderRadius: 16,
                overflow: "hidden",
                aspectRatio: "4 / 3",
                background: "#e0fbfc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 64,
              }}>
                🍲
              </div>
            )}

            <div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#293241", marginBottom: 8 }}>
                Did you know?
              </h3>
              <p style={{ fontSize: 19, fontWeight: 700, color: "#ee6c4d", lineHeight: 1.4, marginBottom: 16 }}>
                There are over 25 cuisines from around the world inside MealApp
              </p>
              <p style={{ fontSize: 15, color: "#3d5a80", lineHeight: 1.8 }}>
                From spicy Asian curries to hearty European stews, MealApp brings together recipes
                sourced from dozens of countries. Each recipe comes with detailed steps so you can
                recreate authentic flavors right from your own kitchen.
              </p>

              {randomMeal && (
                <Link href={`/meal/${randomMeal.idMeal}`} style={{
                  display: "inline-block", marginTop: 24,
                  padding: "10px 20px", borderRadius: 10,
                  background: "#ee6c4d", color: "#fff",
                  fontSize: 14, fontWeight: 500, textDecoration: "none",
                }}>
                  Try this: {randomMeal.strMeal} →
                </Link>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}