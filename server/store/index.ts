import {configureStore} from '@reduxjs/toolkit';
import {marketSlice}  from './market';
import {transactionsSlice} from './transactions'

export const store = configureStore({
    reducer:{
        [marketSlice.name]:marketSlice.reducer,
        [transactionsSlice.name]:transactionsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const {dispatch,getState,subscribe} = store