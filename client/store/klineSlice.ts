import { createSlice } from '@reduxjs/toolkit'
import { WsResponseTypeKline } from '../types'

const initialState: { data: WsResponseTypeKline | undefined } = {
  data: undefined,
}

export const klineSlice = createSlice({
  name: 'kline',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload
    },
  },
})
export const { setData } = klineSlice.actions
export default klineSlice
