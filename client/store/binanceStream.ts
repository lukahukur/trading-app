import { createSlice } from '@reduxjs/toolkit'
import { respKlineK, WsResponseTypeTrade } from '../types'

type InitialStateTypeBinanceSlice = {
  connected: boolean
  startedConnecting: boolean
  error: any
  data: WsResponseTypeTrade
}
export const binanceStreamSlice = createSlice({
  name: 'binanceStreamSlice',
  initialState: {
    connected: false,
    startedConnecting: false,
    error: null,
    data: {},
  } as InitialStateTypeBinanceSlice,

  reducers: {
    startConnecting(state) {
      state.startedConnecting = true
    },
    connected(state) {
      state.startedConnecting = false
      state.connected = true
    },
    getMessage(state, { payload }) {
      state.data = payload
    },
    onError(state, { payload }) {
      state.error = payload
    },
  },
})
export default binanceStreamSlice
export const { startConnecting, connected, getMessage, onError } =
  binanceStreamSlice.actions
