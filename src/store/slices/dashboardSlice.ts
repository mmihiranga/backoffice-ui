import {createSlice} from '@reduxjs/toolkit';

import {IDashboardReduxState} from '../../types/dashboard.types';

const initialState: IDashboardReduxState = {
  loading: false,
  currentTabIndex: 0,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearState: state => {
      state.loading = false;
      state.currentTabIndex = 0;
    },
    setCurrentIndex: (state, action) => {
      state.currentTabIndex = action.payload;
    },
  },
});

export const {clearState, setCurrentIndex} = dashboardSlice.actions;

export default dashboardSlice.reducer;
