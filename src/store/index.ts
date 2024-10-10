import {configureStore} from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { APP_ENV } from "../env";
import userSlice from "../store/redusers/UserReduser"


export const store = configureStore({
    reducer: {
      userStore: userSlice
    },
    devTools: APP_ENV.APP_MODE !== 'release',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;