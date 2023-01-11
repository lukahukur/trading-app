import { HistogramData, ISeriesApi, OhlcData } from "lightweight-charts"
import { BinanceRestApiResponseTypeKline, respKlineK, WsResponseTypeKline } from "../types"

export function timeToLocal(originalTime: any) {
  const d = new Date(originalTime)
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds())
}

export function chartAdapter(data: BinanceRestApiResponseTypeKline): {
  k: Partial<respKlineK>
} {
  return {
    k: {
      t: data[0],
      o: data[1],
      c: data[4],
      h: data[2],
      l: data[3],
    },
  }
}

export function UpdateChart(chart: ISeriesApi<"Candlestick">, __data: WsResponseTypeKline) {
  let data = __data.k
  return chart.update({
    time: timeToLocal(data.t) / 1000,
    open: parseFloat(data.o),
    close: parseFloat(data.c),
    high: parseFloat(data.h),
    low: parseFloat(data.l),
  } as OhlcData)
}

export function UpdateVolume(chart: ISeriesApi<"Histogram">, data: BinanceRestApiResponseTypeKline, colorScheme: { secUp: string; secDown: string }) {
  return chart.update({
    time: timeToLocal(data[0] as number) / 1000,
    value: parseFloat(data[5]),
    color: data[4] > data[1] ? colorScheme.secUp : colorScheme.secDown,
  } as HistogramData)
}

export function volumeAdapter(__data: WsResponseTypeKline) {
  let data = __data.k

  let arr = new Array(5)
  arr[0] = data.t
  arr[1] = data.o
  arr[4] = data.c
  arr[5] = data.v
  return arr
}
