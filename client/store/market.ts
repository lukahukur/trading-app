import { createSlice } from "@reduxjs/toolkit"
import { BinanceStreams, Time } from "../types"

const initialState = {
  market: "btcusdt",
  time: "1m",
} as {
  market: BinanceStreams
  time: Time
}

export const marketSlice = createSlice({
  name: "market",
  initialState: initialState,
  reducers: {
    changeMarket(state, { payload }) {
      state.market = payload
    },
    changeTime(state, { payload }) {
      state.time = payload
    },
  },
})
export default marketSlice.reducer
export const { changeMarket, changeTime } = marketSlice.actions
