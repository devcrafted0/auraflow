import { create } from "zustand";

type useMobileSidebarTypes = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useMobileSidebar = create<useMobileSidebarTypes>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
