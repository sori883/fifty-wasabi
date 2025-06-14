import { createContext, useContext } from "react";

export const SidebarContext = createContext<{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}>({
  collapsed: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCollapsed: () => {},
});

export const useSidebarContext = () => useContext(SidebarContext);