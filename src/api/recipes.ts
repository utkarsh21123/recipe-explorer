import type { Recipe, RecipesResponse } from '../types';

const BASE_URL = 'https://dummyjson.com';
const TIMEOUT_MS = 10000;

export async function fetchRecipes(signal?: AbortSignal): Promise<Recipe[]> {
  // Own timeout so a hung connection surfaces as an error state instead of an endless spinner.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  signal?.addEventListener('abort', () => controller.abort());

  try {
    const res = await fetch(`${BASE_URL}/recipes?limit=30`, {
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }
    const data = (await res.json()) as RecipesResponse;
    return data.recipes;
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      throw new Error('The request timed out. Check your connection.');
    }
    if (e instanceof TypeError) {
      throw new Error('Network error. Check your connection.');
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}
