import { create } from "zustand";

interface CryptoStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useCryptoStore = create<CryptoStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
