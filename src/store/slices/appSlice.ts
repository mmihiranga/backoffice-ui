import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {type IAppReduxState} from '../../types/app.types';
import * as appTypes from '../types/appTypes';

const initialState: IAppReduxState = {
  loading: false,
};

export const syncEverything = createAsyncThunk<
  boolean,
  boolean,
  {
    rejectValue: boolean;
  }
>(appTypes.SYNC_EVERYTHING, async (noLoading: boolean, {rejectWithValue}) => {
  try {
    if (noLoading) {
      //        await new Promise((resolve) => setTimeout(()=> resolve(), 15*60));
    }
    return true;
  } catch (error) {
    return rejectWithValue(false);
  }
});

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearState: state => {
      state.loading = false;
    },
  },
});

export const {clearState} = appSlice.actions;

export default appSlice.reducer;
