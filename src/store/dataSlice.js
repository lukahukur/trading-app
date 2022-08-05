import {createSlice} from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name:'data',
    initialState:{
        isConnected:false,
        isEstablishingConnection:false,
        messageIsReceived:false,
        stream400ms:''
         
        

    },
    reducers:{
        startConnecting: ((state) => {
            state.isEstablishingConnection =true;
          }),
          connectionEstablished: (state => {
            state.isConnected = true;
            state.isEstablishingConnection = true;
          }),
   messageIsreceived:(state=>{
    state.messageIsReceived = true
   }),
   stream400ms:((state,action)=>{
    state.stream400ms = action.payload;
  }),
    }
})
export const {connectionEstablished,startConnecting,messageIsreceived,stream400ms}= dataSlice.actions
export default dataSlice.reducer

