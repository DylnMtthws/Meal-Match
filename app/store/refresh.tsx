import { create } from "zustand";

const useUniversalRefresh = create((set) => ({
  state: 0,
  changeState: () => set({ state + 1}),
}));

export default useUniversalRefresh;
