import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import { PAGE_SIZE } from "@/lib/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  totalItems: number;
}

export default function Pagination({ totalItems }: PaginationProps) {
  // get the current page from the router
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;

  // calculate the total number of pages, start index, and end index
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(startIndex + PAGE_SIZE - 1, totalItems);

  // Navigation handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      router.push(
        {
          pathname: router.pathname,
          // preserve the existing query parameters
          query: { ...router.query, page: newPage },
        },
        undefined,
        { scroll: true }
      );
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: newPage },
        },
        undefined,
        { scroll: true }
      );
    }
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center my-8 px-2">
      <p className="mb-4 sm:mb-0 border border-accent-500 rounded-xl px-3 py-1 shadow-md text-primary-50 shadow-accent-500">
        Showing{" "}
        <span className="bg-white text-accent-500 rounded-xl px-3 py-1">
          {startIndex} - {endIndex}
        </span>{" "}
        of {totalItems} results
      </p>

      <div className="flex items-center space-x-4 text-primary-50 ">
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
          variant="outline"
        >
          <ChevronLeftIcon className="size-4 stroke-2" />
        </Button>

        <span className="bg-white rounded-xl px-3 py-1 shadow-md shadow-accent-500">
          Page <span className="text-accent-500">{currentPage}</span> /{" "}
          {totalPages}
        </span>

        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          variant="outline"
        >
          <ChevronRightIcon className="size-4 stroke-2" />
        </Button>
      </div>
    </div>
  );
}
