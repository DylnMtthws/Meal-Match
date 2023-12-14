import { create } from "zustand";
import { Ingredient } from "./interfaces";

export interface IngredientState {
  ingredientsList: Array<Ingredient & { name: string }>;
}

const useIngredientStore = create<IngredientState>((set) => ({
  ingredientsList: [],
  setIngredientsList: (selectedIngredients) =>
    set({ ingredientsList: selectedIngredients }),

  clearIngredientsList: () =>
    set(() => {
      return {
        ingredientsList: [],
      };
    }),

  removeIngredient: (ingredient: Ingredient) =>
    set((state) => {
      return {
        ingredientsList: state.ingredientsList.filter(
          (i) => i.id !== ingredient.id
        ),
      };
    }),
}));

export default useIngredientStore;
