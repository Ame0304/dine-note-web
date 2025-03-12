import { FormEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useCategories } from "@/hooks/categories/useCategories";

interface RecipeControlsProps {
  userId?: string | undefined;
}

export default function RecipeControls({ userId }: RecipeControlsProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { categories } = useCategories(userId);

  const handleSearch = (e?: FormEvent) => {
    e?.preventDefault();

    // keep the current query params and update the search term
    const query = { ...router.query };
    if (searchTerm.trim() === "") {
      delete query.search;
    } else {
      query.search = searchTerm;
    }

    // reset to page 1 when search changes
    delete query.page;

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSort = (value: string) => {
    const query = { ...router.query };
    query.sortBy = value;

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleFilterCategory = (value: string) => {
    const query = { ...router.query };

    if (value === "0") {
      delete query.filter;
    } else {
      query.filter = value;
    }

    // Reset pagination when filter changes
    delete query.page;

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="flex flex-col gap-4 mt-4 mb-8 md:flex-row md:items-center md:justify-between">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
        <input
          id="search"
          placeholder="Search recipes..."
          value={searchTerm}
          className="w-full px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500  shadow-md shadow-accent-500 placeholder:text-primary-50/70 placeholder:text-sm"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <span className="absolute right-3 top-2.5">
          <MagnifyingGlassIcon className="size-5 stroke-2 text-accent-500" />
        </span>
      </form>

      {/* Controls Group */}
      <div className="flex flex-wrap gap-3">
        {/* Category Filter */}
        <select
          className="px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400 shadow-md shadow-accent-400 text-accent-400"
          onChange={(e) => handleFilterCategory(e.target.value)}
          value={String(router.query.filter || "0")}
        >
          <option value="0"> All Categories </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          className="px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400  shadow-md shadow-accent-400 text-accent-400"
          onChange={(e) => handleSort(e.target.value)}
          value={String(router.query.sortBy || "date-desc")}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
        </select>
      </div>
    </div>
  );
}
