import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserReduxState } from "../../types/user.types";

const initialState: IUserReduxState = {
  loading: false,
  userType: "Traveler",
  selectedField: undefined,
  users: [],
  isShowUserModal: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.selectedField = undefined;
      state.users = [];
      state.isShowUserModal = false;
    },
    setSelectedField: (state, action) => {
      state.selectedField = action.payload;
    },
    setShowUserModel: (state, action) => {
      state.isShowUserModal = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { clearState, setSelectedField, setShowUserModel, setUserType } =
  userSlice.actions;

export default userSlice.reducer;
