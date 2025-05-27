import { Recipe } from "./types";
import StarRating from "./StarRating";

interface RecipeDetailsDrawerProps {
  selectedRecipe: Recipe | null;
  showTimes: boolean;
  onClose: () => void;
  onToggleShowTimes: () => void;
}

export default function RecipeDetailsDrawer({ 
  selectedRecipe, 
  showTimes, 
  onClose, 
  onToggleShowTimes 
}: RecipeDetailsDrawerProps) {
  if (!selectedRecipe) return null;

  return (
    <>
      {/* Recipe Details Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 overflow-auto z-50 transform transition-transform duration-300 ease-in-out"
        style={{ maxWidth: "90vw" }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold truncate">{selectedRecipe.title}</h2>
              <div className="flex items-center mt-1 space-x-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                  {selectedRecipe.cuisine}
                </span>
                <div className="flex items-center text-yellow-300">
                  <StarRating rating={selectedRecipe.rating} />
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 rounded-full hover:bg-white/20 transition-colors duration-200"
              aria-label="Close drawer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">{selectedRecipe.description}</p>
          </div>

          {/* Timing Information */}
          <div className="bg-blue-50 rounded-xl p-4">
            <button
              onClick={onToggleShowTimes}
              className="flex items-center justify-between w-full text-left group"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-gray-800">Total Time: {selectedRecipe.total_time} min</span>
              </div>
              <svg
                className={`w-5 h-5 text-blue-600 transform transition-transform duration-200 ${
                  showTimes ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {showTimes && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedRecipe.prep_time}</div>
                  <div className="text-sm text-gray-600">Prep Time</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedRecipe.cook_time}</div>
                  <div className="text-sm text-gray-600">Cook Time</div>
                </div>
              </div>
            )}
          </div>

          {/* Servings */}
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-semibold text-gray-800">Serves: {selectedRecipe.serves}</span>
            </div>
          </div>

          {/* Nutrition Information */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Nutrition Facts
            </h3>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {Object.entries(selectedRecipe.nutrients).map(([key, val], index) => (
                <div key={key} className={`px-4 py-3 flex justify-between items-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <span className="font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1").replace(/Content$/, "")}
                  </span>
                  <span className="text-gray-900 font-semibold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
      />
    </>
  );
}
