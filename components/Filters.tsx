interface FiltersProps {
  filters: {
    title: string;
    cuisine: string;
    rating: string;
  };
  onFilterChange: (field: string, value: string) => void;
}

export default function Filters({ filters, onFilterChange }: FiltersProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
        </svg>
        Search & Filter
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Title</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              value={filters.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange("title", e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
          <input
            type="text"
            placeholder="e.g. Italian, Asian..."
            value={filters.cuisine}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange("cuisine", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
          <input
            type="text"
            placeholder='e.g. ">=4.5"'
            value={filters.rating}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange("rating", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
}
