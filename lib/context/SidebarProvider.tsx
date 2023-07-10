"use client";

export const dynamic = "force-dynamic";

import { createContext, ReactNode, useContext, useState } from "react";

type sidebarContextType = {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const sidebarContextDefaultValues: sidebarContextType = {
  isOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
};

const SidebarContext = createContext(sidebarContextDefaultValues);

export function useSidebar() {
  return useContext(SidebarContext);
}

type Props = {
  children: ReactNode;
};

export function SidebarProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const value = {
    isOpen,
    openSidebar,
    closeSidebar,
  };
  return (
    <>
      <SidebarContext.Provider value={value}>
        {children}
      </SidebarContext.Provider>
    </>
  );
}
