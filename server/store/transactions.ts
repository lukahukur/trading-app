import {createSlice} from '@reduxjs/toolkit'
import { Transactions } from '../types/types';

export const transactionsSlice = createSlice({
    name:'transactions',
    initialState:{
        transactions:[]
    } as 
    {transactions:Transactions[]},
    reducers:{
        setTransactions(state,{payload}){
            state.transactions = payload;
        }
    }
});

export const {setTransactions} = transactionsSlice.actions;