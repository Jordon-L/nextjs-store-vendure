"use client";

export const dynamic = "force-dynamic";

import { createContext, ReactNode, useContext, useState } from "react";

type searchBarContextType = {
  searchIsOpen: boolean;
  openSearchBar: () => void;
  closeSearchBar: () => void;
};

const searchBarContextDefaultValues: searchBarContextType = {
  searchIsOpen: false,
  openSearchBar: () => {},
  closeSearchBar: () => {},
};

const SearchBarContext = createContext(searchBarContextDefaultValues);

export function useSearchBar() {
  return useContext(SearchBarContext);
}

type Props = {
  children: ReactNode;
};

export function SearchBarProvider({ children }: Props) {
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);

  const openSearchBar = () => {
    setSearchIsOpen(true);
  };

  const closeSearchBar = () => {
    setSearchIsOpen(false);
  };

  const value = {
    searchIsOpen,
    openSearchBar,
    closeSearchBar,
  };
  return (
    <>
      <SearchBarContext.Provider value={value}>
        {children}
      </SearchBarContext.Provider>
    </>
  );
}
