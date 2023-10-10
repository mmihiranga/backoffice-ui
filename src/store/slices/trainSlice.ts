import { createSlice } from "@reduxjs/toolkit";
import { ITrainReduxState } from "../../types/train.types";

const initialState: ITrainReduxState = {
  loading: false,
  selectedField: undefined,
  trains: [],
  isShowTrainModal: false,
};

export const trainSlice = createSlice({
  name: "train",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.selectedField = undefined;
      state.trains = [];
      state.isShowTrainModal = false;
    },
    setSelectedField: (state, action) => {
      state.selectedField = action.payload;
    },
    setShowTrainModel: (state, action) => {
      state.isShowTrainModal = action.payload;
    },
  },
});

export const { clearState, setSelectedField, setShowTrainModel } =
  trainSlice.actions;

export default trainSlice.reducer;
