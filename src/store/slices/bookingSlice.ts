import { createSlice } from "@reduxjs/toolkit";
import { IBookingReduxState } from "../../types/booking.types";

const initialState: IBookingReduxState = {
  loading: false,
  selectedField: undefined,
  bookings: [],
  isShowBookingModal: false,
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.selectedField = undefined;
      state.bookings = [];
      state.isShowBookingModal = false;
    },
    setShowBookingModel: (state, action) => {
      state.isShowBookingModal = action.payload;
    },
    setSelectedField: (state, action) => {
      state.selectedField = action.payload;
    },
  },
});

export const { clearState, setSelectedField, setShowBookingModel } =
  bookingSlice.actions;

export default bookingSlice.reducer;
