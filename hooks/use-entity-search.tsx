import { PAGINATION } from "@/config/constants";
import React from "react";

interface UseEntitySearchProps<
  T extends {
    search: string;
    page: number;
  },
> {
  params: T;
  setParams: (params: T) => void;
  debounceMs?: number;
}

export function useEntitySearch<
  T extends {
    search: string;
    page: number;
  },
>({ params, setParams, debounceMs = 500 }: UseEntitySearchProps<T>) {
  const [searchValue, setSearchValue] = React.useState(params.search);

  // Sync from URL (e.g. back button)
  React.useEffect(() => {
    setSearchValue(params.search);
  }, [params.search]);

  // Debounced update to URL
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== params.search) {
        setParams({
          search: searchValue,
          page: PAGINATION.DEFAULT_PAGE,
        } as any);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchValue, debounceMs, params.search, setParams]);

  return {
    searchValue,
    onSearchChange: setSearchValue,
  };
}
