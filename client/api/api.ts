import {
  BinanceRestApiResponseTypeKline,
  Time,
  WsResponseTypeKline,
  WsResponseTypeDepth,
  WsResponseTypeTicker,
  WsStreamType,
  BinanceStreams,
  WsResponseTypeTrade,
  TdepthRestApi,
} from '../types/index'
import { getKlineRecordCount } from './constant'

export async function getDataFromBinanceApiKline(
  market: BinanceStreams,
  interval: Time,
  abortController: AbortController,
): Promise<BinanceRestApiResponseTypeKline[]> {
  let data: BinanceRestApiResponseTypeKline[] = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${market.toUpperCase()}&interval=${interval}&limit=${getKlineRecordCount}`,
    {
      signal: abortController.signal,
    },
  ).then((e) => e.json())

  return data
}

export async function getDataFromBinanceApiDepth(
  market: BinanceStreams,
  abortController: AbortController,
): Promise<TdepthRestApi> {
  let data: TdepthRestApi = await fetch(
    `https://api.binance.com/api/v3/depth?symbol=${market.toUpperCase()}&limit=10`,
    {
      signal: abortController.signal,
    },
  ).then((e) => e.json())
  return data
}

export const wsController = (
  streams: BinanceStreams,
  SType: WsStreamType,
  interval?: Time,
) => {
  let url: string

  if (SType === '@kline')
    url = `wss://stream.binance.com:9443/ws/${streams}@kline_${interval}`
  else url = `wss://stream.binance.com:9443/ws/${streams}${SType}`

  const ws = new WebSocket(url)

  type DataType =
    | WsResponseTypeKline
    | WsResponseTypeTrade
    | WsResponseTypeDepth
    | WsResponseTypeTicker
    | unknown

  const message = (callback: (data__: DataType) => void) => {
    function messageHandler(Event: any) {
      let data: DataType = JSON.parse(Event.data)

      callback(data)
    }

    ws.addEventListener('message', messageHandler)

    function removeMessageListener() {
      return ws.removeEventListener('message', messageHandler)
    }

    return { removeMessageListener }
  }

  const wsClose = () => ws.close()

  return { message, wsClose }
}
