import { FormEvent, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const searchParam = router.query.search;
    if (typeof searchParam === "string") {
      setSearchTerm(searchParam);
    } else if (!searchParam && searchTerm) {
      // Clear search input if URL has no search param but input has value
      setSearchTerm("");
    }
  }, [router.query.search]);

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

  const clearSearch = () => {
    setSearchTerm("");
    // Also clear the search from URL params immediately
    const query = { ...router.query };
    delete query.search;
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
    <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
      <div className="absolute left-3 top-2.5">
        <MagnifyingGlassIcon className="size-5 stroke-2 text-accent-500" />
      </div>
      <input
        id="search"
        placeholder="Search recipes..."
        value={searchTerm}
        className="w-full py-1.5 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 shadow-md shadow-accent-500 placeholder:text-primary-50/70 placeholder:text-sm bg-white text-accent-200 font-semibold"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <div className="absolute right-3 top-2.5">
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="mr-1 hover:text-accent-600"
            aria-label="Clear search"
          >
            <XMarkIcon className="size-5 stroke-2 text-accent-500" />
          </button>
        )}
      </div>
    </form>
  );
}
