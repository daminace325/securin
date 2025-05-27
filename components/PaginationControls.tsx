interface PaginationControlsProps {
  page: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export default function PaginationControls({ 
  page, 
  totalPages, 
  limit, 
  onPageChange, 
  onLimitChange 
}: PaginationControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Page</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg font-medium">{page}</span>
          <span className="text-sm text-gray-600">of {totalPages || 1}</span>
        </div>
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Next
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex items-center space-x-3">
        <label htmlFor="limit-select" className="text-sm font-medium text-gray-700">Show:</label>
        <select
          id="limit-select"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {[15, 25, 35, 50].map((n) => (
            <option key={n} value={n}>
              {n} recipes
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
