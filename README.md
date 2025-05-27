# Recipe Management Application 🍳

A modern, full-stack recipe management application built with Next.js, TypeScript, and MongoDB. This application provides a comprehensive platform for browsing, searching, and managing recipes with detailed nutritional information.

## ✨ Features

### 🔍 **Advanced Search & Filtering**
- **Title Search**: Find recipes by name with partial matching
- **Cuisine Filter**: Filter by specific cuisine types (Italian, Asian, etc.)
- **Rating Filter**: Search by minimum rating using comparison operators (`>=4.5`, `>3`, etc.)
- **Time Filter**: Filter by cooking/prep time (supports `<=30`, `>60`, etc.)
- **Calorie Filter**: Filter by calorie content with comparison operators

### 📊 **Recipe Management**
- **Paginated Recipe Listing**: Browse recipes with customizable page sizes (10, 15, 25, 50 items)
- **Detailed Recipe View**: Comprehensive recipe details in an elegant sidebar drawer
- **Star Rating System**: Visual 5-star rating display
- **Nutritional Information**: Complete nutritional breakdown for each recipe
- **Recipe Import**: Bulk import recipes from JSON files


## 🛠️ Tech Stack

- **Frontend**: Next.js 15.1.8, React 19, TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **Database**: MongoDB with connection pooling
- **Backend**: Next.js API Routes
- **Icons**: Custom SVG icons
- **Fonts**: Geist font family

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

### Recipe Collection (`recipe`)
```typescript
{
  _id: string;
  title: string;
  cuisine: string;
  rating: number;              // 1-5 rating
  prep_time: number;           // minutes
  cook_time: number;           // minutes
  total_time: number;          // minutes
  description: string;
  serves: string;              // serving size
  nutrients: {
    calories: string;          // "389 kcal"
    carbohydrateContent: string;
    cholesterolContent: string;
    fiberContent: string;
    proteinContent: string;
    saturatedFatContent: string;
    sodiumContent: string;
    sugarContent: string;
    fatContent: string;
  };
}
```

## 🔌 API Endpoints

### `GET /api/recipes`
Fetch paginated recipes sorted by rating (descending).

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

### `GET /api/recipes/search`
Advanced search with multiple filter options.

**Query Parameters:**
- `title`: Recipe title (partial match, case-insensitive)
- `cuisine`: Cuisine type (exact match)
- `rating`: Rating filter (supports `>=4.5`, `>3`, `<=2`, etc.)
- `total_time`: Time filter (supports comparison operators)
- `calories`: Calorie filter (supports comparison operators)
- `page`: Page number
- `limit`: Items per page

**Example:**
```
/api/recipes/search?title=pasta&cuisine=Italian&rating=>=4.0&page=1&limit=15
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


## 📝 License

This project is part of the Securin Assessment and is for educational/evaluation purposes.


**Built with ❤️ using Next.js, TypeScript, and MongoDB**
