import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {authSlice} from "./authSlice";
import { useDispatch, useSelector,TypedUseSelectorHook } from "react-redux";
import {binanceStreamSlice} from './binanceStream'
import { loginApi } from "./_api";
import { wssMiddleware } from "./wssMiddleware";
import {marketSlice} from './market'
import themeReducer,{themeSlice} from './theme'
import {dbDataWs} from './dbws'

export const store = ()=>
   configureStore({
    reducer:{
        [authSlice.name]:authSlice.reducer,
        [loginApi.reducerPath]:loginApi.reducer,
        [binanceStreamSlice.name]:binanceStreamSlice.reducer,
        [marketSlice.name]:marketSlice.reducer,
        [themeSlice.name]:themeReducer,
        [dbDataWs.name]:dbDataWs.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }).prepend(loginApi.middleware,wssMiddleware),
   });

   export type AppStore = ReturnType<typeof store>;
   export type AppState = ReturnType<AppStore["getState"]>;
   export type AppDispatch = AppStore['dispatch'];
   
   export const typedDispatch = useDispatch<AppDispatch>;
   export const typedUseSelector:TypedUseSelectorHook<AppState> = useSelector;
   
   export const wrapper = createWrapper<AppStore>(store);

  