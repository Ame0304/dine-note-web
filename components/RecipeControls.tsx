import SearchBar from "./SearchBar";
import Sort from "./Sort";
import Filter from "./Filter";

interface RecipeControlsProps {
  userId?: string | undefined;
}

export default function RecipeControls({ userId }: RecipeControlsProps) {
  return (
    <div className="flex flex-col gap-4 mt-4 mb-8 md:flex-row md:items-center md:justify-between">
      {/* Search Bar */}
      <SearchBar />

      {/* Controls Group */}
      <div className="flex flex-wrap gap-3">
        {/* Category Filter */}
        <Filter userId={userId} />

        {/* Sort Dropdown */}

        <Sort />
      </div>
    </div>
  );
}
