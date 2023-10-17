import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserReduxState, User } from "../../types/user.types";
import Api from "../../services/Api";

const initialState: IUserReduxState = {
  loading: false,
  userType: "Traveler",
  selectedField: undefined,
  users: [],
  isShowUserModal: false,
};

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { dispatch }) => {
    try {
      const response = await Api.get("/Users/getUsers");
      const userRows = response.data.map((responseData: any) => {
        return {
          id: responseData.nic,
          name: responseData.name,
          email: responseData.username,
          age: responseData.age,
          address: responseData.address,
          phoneNo: responseData.contactNo,
          password: responseData.password,
          isActive: responseData.isActive,
          role: responseData.role,
        };
      });

      dispatch(setUsers(userRows));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

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
    setUsers: (state, action: PayloadAction<User[] | undefined>) => {
      state.users = action.payload;
    },
  },
});

export const {
  clearState,
  setSelectedField,
  setShowUserModel,
  setUserType,
  setUsers,
} = userSlice.actions;

export default userSlice.reducer;
