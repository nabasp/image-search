"use client";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import ImageGallery from "@/components/image-gallery";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "@/components/icons";
import { ApiResponse, Photo } from "@/types/api";

export default function DocsPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("car"); // Initial search query

  const perPage = 20; // Number of items per page

  // Debounce function using lodash
  const fetchPhotos = useCallback(
    debounce(async (searchQuery: string) => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/photos?query=${searchQuery}&per_page=${perPage}&page=${currentPage}`
        );
        const data: ApiResponse = await response.json();
        setPhotos(data.photos);
        setTotalResult(data.total_results);
        setTotalPages(Math.ceil(data.total_results / perPage));
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      } finally {
        setLoading(false);
      }
    }, 500), // Debounce delay
    [currentPage]
  );

  useEffect(() => {
    if (query) {
      fetchPhotos(query);
    }
  }, [query, currentPage, fetchPhotos]);

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const handleGotoPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="flex flex-col">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        onChange={handleSearchChange}
        type="search"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col">
          <p className="text-lg font-bold my-4">{query} stock photo and images ({totalResult})</p>
          <ImageGallery
            images={photos}
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            onPageChange={handleGotoPage}
          />
        </div>
      )}
    </div>
  );
}
