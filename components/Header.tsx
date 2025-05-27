interface HeaderProps {
  total: number;
}

export default function Header({ total }: HeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Recipe Explorer
            </h1>
            <p className="text-gray-600 mt-1">Discover amazing recipes from around the world</p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{total} recipes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
