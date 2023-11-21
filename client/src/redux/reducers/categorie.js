import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const categorieReducer = createReducer(initialState, {
    categorieCreateRequest: (state) => {
    state.isLoading = true;
  },
  categorieCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.categorie = action.payload;
    state.success = true;
  },
  categorieCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all categories 
  getAllCategorieRequest: (state) => {
    state.isLoading = true;
  },
  getAllCategorieSuccess: (state, action) => {
    state.isLoading = false;
    state.categories = action.payload;
  },
  getAllCategorieFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete Categories of a shop
  deleteCategorieRequest: (state) => {
    state.isLoading = true;
  },
  deleteCategorieSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteCategorieFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // update Categorie information
  updateCategorieRequest: (state) => {
    state.isLoading = true;
  },
  updateCategorieSuccess: (state, action) => {
    state.isLoading = false;
    state.Categorie = action.payload;
    state.success = true;
  },
  updateCategorieFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all Categories
  getAllCategoriesRequest: (state) => {
    state.isLoading = true;
  },
  getAllCategoriesSuccess: (state, action) => {
    state.isLoading = false;
    state.allCategories = action.payload;
  },
  getAllCategoriesFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
