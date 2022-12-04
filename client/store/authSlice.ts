import {createSlice} from "@reduxjs/toolkit"
import {loginApi} from './_api'

type Istate = {
    authState:boolean
}
const initialState = {
    authState:false
} as Istate;

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuthState(state,action){
            console.log(action.type)
            state.authState = action.payload;
        }
    }
})
export const {setAuthState} =  authSlice.actions;
export default authSlice.reducer;