"use client";

import React, { useEffect, useState } from "react";
import { Recipe } from "../components/types";
import Header from "../components/Header";
import Filters from "../components/Filters";
import PaginationControls from "../components/PaginationControls";
import RecipeTable from "../components/RecipeTable";
import RecipeDetailsDrawer from "../components/RecipeDetailsDrawer";

export default function Page() {
  // State
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    title: "",
    cuisine: "",
    rating: "",
  });
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showTimes, setShowTimes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // Helpers to build query for /search API
  function buildSearchQuery() {
    const params = new URLSearchParams();

    if (filters.title.trim()) params.append("title", filters.title.trim());
    if (filters.cuisine.trim()) params.append("cuisine", filters.cuisine.trim());
    if (filters.rating.trim()) params.append("rating", filters.rating.trim());

    params.append("page", page.toString());
    params.append("limit", limit.toString());

    return params.toString();
  }

  // Fetch recipes
  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      setNoResults(false);

      try {
        let url = "";
        const hasFilters =
          filters.title.trim() || filters.cuisine.trim() || filters.rating.trim();

        if (hasFilters) {
          url = `/api/recipes/search?${buildSearchQuery()}`;
        } else {
          // fallback to /api/recipes (paginated, sorted by rating desc)
          url = `/api/recipes?page=${page}&limit=${limit}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch recipes");

        const data = await res.json();

        if ("data" in data) {
          setRecipes(data.data);
          setTotal(data.total || 0);
          if (data.data.length === 0) setNoResults(true);
        } else if (Array.isArray(data)) {
          setRecipes(data);
          setTotal(data.length);
          if (data.length === 0) setNoResults(true);
        } else {
          setRecipes([]);
          setTotal(0);
          setNoResults(true);
        }
      } catch (e) {
        console.error(e);
        setRecipes([]);
        setTotal(0);
        setNoResults(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, [page, limit, filters]);

  // Handlers
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1); // reset to page 1 when filter changes
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header total={total} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Filters filters={filters} onFilterChange={handleFilterChange} />

        <PaginationControls 
          page={page}
          totalPages={totalPages}
          limit={limit}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />

        <RecipeTable 
          recipes={recipes}
          loading={loading}
          noResults={noResults}
          onRecipeSelect={(recipe) => {
            setSelectedRecipe(recipe);
            setShowTimes(false);
          }}
        />
      </div>

      <RecipeDetailsDrawer 
        selectedRecipe={selectedRecipe}
        showTimes={showTimes}
        onClose={() => setSelectedRecipe(null)}
        onToggleShowTimes={() => setShowTimes((v) => !v)}
      />
    </main>
  );
}
