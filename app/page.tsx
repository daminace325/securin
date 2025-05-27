"use client";

import React, { useEffect, useState } from "react";

type Nutrients = {
  calories: string;
  carbohydrateContent: string;
  cholesterolContent: string;
  fiberContent: string;
  proteinContent: string;
  saturatedFatContent: string;
  sodiumContent: string;
  sugarContent: string;
  fatContent: string;
};

type Recipe = {
  _id: string;
  title: string;
  cuisine: string;
  rating: number;
  prep_time: number;
  cook_time: number;
  total_time: number;
  description: string;
  nutrients: Nutrients;
  serves: string;
};

const stars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex space-x-0.5 text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.572-.955L10 0l2.94 5.955 6.572.955-4.756 4.635 1.122 6.545z" />
        </svg>
      ))}
      {halfStar && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-current"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfGrad)"
            d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.572-.955L10 0l2.94 5.955 6.572.955-4.756 4.635 1.122 6.545z"
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 fill-gray-300"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.572-.955L10 0l2.94 5.955 6.572.955-4.756 4.635 1.122 6.545z" />
        </svg>
      ))}
    </div>
  );
};

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
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Recipe List</h1>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Filter by Title (partial)"
          value={filters.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange("title", e.target.value)}
          className="px-3 py-2 border rounded w-64"
        />
        <input
          type="text"
          placeholder="Filter by Cuisine"
          value={filters.cuisine}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange("cuisine", e.target.value)}
          className="px-3 py-2 border rounded w-64"
        />
        <input
          type="text"
          placeholder='Filter by Rating (e.g. ">=4.5")'
          value={filters.rating}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange("rating", e.target.value)}
          className="px-3 py-2 border rounded w-64"
        />
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center mb-2 space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>

        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="ml-auto px-3 py-1 border rounded"
        >
          {[15, 25, 35, 50].map((n) => (
            <option key={n} value={n}>
              Show {n}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Cuisine</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Rating</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total Time (min)</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Serves</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-8">
                  Loading...
                </td>
              </tr>
            ) : noResults ? (
              <tr>
                <td colSpan={5} className="text-center py-8">
                  No recipes found.
                </td>
              </tr>
            ) : (
              recipes.map((r) => (
                <tr
                  key={r._id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectedRecipe(r);
                    setShowTimes(false);
                  }}
                >
                  <td className="border border-gray-300 px-4 py-2 max-w-xs truncate">{r.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{r.cuisine}</td>
                  <td className="border border-gray-300 px-4 py-2">{stars(r.rating)}</td>
                  <td className="border border-gray-300 px-4 py-2">{r.total_time}</td>
                  <td className="border border-gray-300 px-4 py-2">{r.serves}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      {selectedRecipe && (
        <div
          className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl border-l border-gray-300 overflow-auto z-50"
          style={{ maxWidth: "90vw" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 sticky top-0 bg-white z-10">
            <div>
              <h2 className="text-xl font-bold">{selectedRecipe.title}</h2>
              <p className="text-sm text-gray-600">{selectedRecipe.cuisine}</p>
            </div>
            <button
              onClick={() => setSelectedRecipe(null)}
              className="text-gray-500 hover:text-gray-800"
              aria-label="Close drawer"
            >
              ✕
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <strong>Description: </strong>
              <p>{selectedRecipe.description}</p>
            </div>

            <div>
              <button
                onClick={() => setShowTimes((v) => !v)}
                className="flex items-center space-x-1 text-blue-600 hover:underline"
              >
                <span>Total Time: {selectedRecipe.total_time} min</span>
                <svg
                  className={`h-4 w-4 transform transition-transform ${
                    showTimes ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {showTimes && (
                <ul className="mt-2 ml-4 list-disc text-gray-700">
                  <li>Cook Time: {selectedRecipe.cook_time} min</li>
                  <li>Prep Time: {selectedRecipe.prep_time} min</li>
                </ul>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Nutrition</h3>
              <table className="w-full text-sm border border-gray-300">
                <tbody>
                  {Object.entries(selectedRecipe.nutrients).map(([key, val]) => (
                    <tr key={key} className="border-b border-gray-200">
                      <td className="px-3 py-1 font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
                      <td className="px-3 py-1">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop behind drawer */}
      {selectedRecipe && (
        <div
          onClick={() => setSelectedRecipe(null)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}
    </main>
  );
}
