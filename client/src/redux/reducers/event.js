import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, {
  eventCreateRequest: (state) => {
    state.isLoading = true;
  },
  eventCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  },
  eventCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all events of Seller
  getAlleventsSellerRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsSellerSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
  },
  getAlleventsSellerFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete event of a Seller
  deleteeventRequest: (state) => {
    state.isLoading = true;
  },
  deleteeventSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteeventFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all events 
  getAlleventsRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsSuccess: (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  },
  getAlleventsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },

   // update Event information
   updateEventRequest: (state) => {
    state.isLoading = true;
  },
  updateEventSuccess: (state, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  },
  updateEventFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  
});
