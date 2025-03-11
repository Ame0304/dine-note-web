import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// type SortOption = "newest" | "oldest" | "name-asc" | "name-desc";

// interface RecipeControlsProps {
//     onSearch: (term: string) => void;
//     onSort: (option: SortOption) => void;
//   onFilterCategory: (category: string) => void;
// }

/*
    onSearch,
    onSort,
  onFilterCategory,}: RecipeControlsProps

  */

export default function RecipeControls() {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Main Course", "Appetizer", "Dessert", "Beverage"];

  return (
    <div className="flex flex-col gap-4 mt-4 mb-8 md:flex-row md:items-center md:justify-between">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <input
          id="search"
          placeholder="Search recipes..."
          value={searchTerm}
          className="w-full px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500  shadow-md shadow-accent-500 placeholder:text-primary-50/70 placeholder:text-sm"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            // onSearch(e.target.value);
          }}
        />
        <span className="absolute right-3 top-2.5">
          <MagnifyingGlassIcon className="size-5 stroke-2 text-accent-500" />
        </span>
      </div>

      {/* Controls Group */}
      <div className="flex flex-wrap gap-3">
        {/* Category Filter */}
        <select
          className="px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400 shadow-md shadow-accent-400 text-accent-400"
          //   onChange={(e) => onFilterCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category.toLowerCase()}>
              {category}
            </option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          className="px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400  shadow-md shadow-accent-400 text-accent-400"
          // onChange={(e) => onSort(e.target.value as SortOption)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>
    </div>
  );
}
