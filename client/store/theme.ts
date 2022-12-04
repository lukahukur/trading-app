import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    bgColor:'#131722',
    darkMode:true,
    downColor:'rgba(239,83,80, 0.4)',
    upColor:'rgba(38,198,218, 0.56)',
    secondaryBgColor:'#1F2937',
    secondaryUp:'#047D74',
    secondaryDown:'#D04749'
} as {
    upColor:string,
    downColor:string,
    bgColor:string,
    secondaryBgColor:string,
    darkMode:boolean,
    secondaryUp:string,
    secondaryDown:string
}

export const themeSlice  = createSlice({
    name:'theme',
    initialState:initialState,
    reducers:{
        setPrimaryColors(state,{payload}){
         state.upColor = payload.upColor;
         state.downColor = payload.downColor;
        },
        setSecondaryColors(state,{payload}){
            state.secondaryUp = payload.secondaryUp;
            state.secondaryDown = payload.secondaryDown;
        },
        darkMode(state,{payload}){
            state.darkMode = payload;
        },
        setBgColors(state,{payload}){
            state.bgColor = payload.bgColor;
            state.secondaryBgColor = payload.secondaryBgColor;
        }
    }
})
export default themeSlice.reducer;
export const {darkMode,setBgColors,setPrimaryColors,setSecondaryColors} = themeSlice.actions