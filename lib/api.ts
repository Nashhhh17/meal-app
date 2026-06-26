import axios from "axios";
import { Category, Area, Meal, MealSummary } from "@/types/meal";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const api = axios.create({ baseURL: BASE_URL });

// Cari meal by nama
export async function searchMeals(query: string): Promise<MealSummary[]> {
  const res = await api.get(`/search.php?s=${query}`);
  return res.data.meals || [];
}

// Ambil detail meal by ID
export async function getMealById(id: string): Promise<Meal | null> {
  const res = await api.get(`/lookup.php?i=${id}`);
  return res.data.meals?.[0] || null;
}

// Ambil semua kategori
export async function getCategories(): Promise<Category[]> {
  const res = await api.get("/categories.php");
  return res.data.categories || [];
}

// Filter meal by kategori
export async function getMealsByCategory(
  category: string
): Promise<MealSummary[]> {
  const res = await api.get(`/filter.php?c=${category}`);
  return res.data.meals || [];
}

// Filter meal by area/negara
export async function getMealsByArea(area: string): Promise<MealSummary[]> {
  const res = await api.get(`/filter.php?a=${area}`);
  return res.data.meals || [];
}

// Ambil list semua area
export async function getAreas(): Promise<Area[]> {
  const res = await api.get("/list.php?a=list");
  return res.data.meals || [];
}

// Meal random
export async function getRandomMeal(): Promise<Meal | null> {
  const res = await api.get("/random.php");
  return res.data.meals?.[0] || null;
}

// Ambil beberapa random meal sekaligus (panggil beberapa kali)
export async function getMultipleRandomMeals(count: number): Promise<Meal[]> {
  const promises = Array.from({ length: count }, () => getRandomMeal());
  const results = await Promise.all(promises);
  return results.filter((meal): meal is Meal => meal !== null);
}