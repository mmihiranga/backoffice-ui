import {
  type AnyAction,
  type CombinedState,
  combineReducers,
  configureStore,
  type Reducer,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import { createWhitelistFilter } from "redux-persist-transform-filter";
import thunk from "redux-thunk";

import { type IAppReduxState } from "../types/app.types";
import { IDashboardReduxState } from "../types/dashboard.types";
import appSlice from "./slices/appSlice";
import dashboardSlice from "./slices/dashboardSlice";
import { IBookingReduxState } from "../types/booking.types";
import { ITrainReduxState } from "../types/train.types";
import { IUserReduxState } from "../types/user.types";
import bookingSlice from "./slices/bookingSlice";
import trainSlice from "./slices/trainSlice";
import userSlice from "./slices/userSlice";

const rootReducer: Reducer<
  CombinedState<{
    app: IAppReduxState;
    dashboard: IDashboardReduxState;
    booking: IBookingReduxState;
    train: ITrainReduxState;
    user: IUserReduxState;
  }>,
  AnyAction
> = combineReducers({
  app: appSlice,
  dashboard: dashboardSlice,
  booking: bookingSlice,
  train: trainSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: localStorage,
    whitelist: ["app", "dashboard"],
    blacklist: ["user", "train", "booking"],
    transforms: [createWhitelistFilter("app", ["loading"])],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({ serializableCheck: false });
    middleware.concat(thunk);
    return middleware;
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
