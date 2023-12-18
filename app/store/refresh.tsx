import { create } from "zustand";

const useUniversalRefresh = create((set) => ({
  state: 0,
  changeState: () => set((state) => ({ state: Date.now() })),
}));

export default useUniversalRefresh;
