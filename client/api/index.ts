import { ISeriesApi } from 'lightweight-charts'
import {
  BinanceRestApiResponseTypeKline,
  coinsType,
  tailwindTheme,
  WsResponseTypeKline,
} from '../types'

import {
  chartAdapter,
  UpdateChart,
  UpdateVolume,
  volumeAdapter,
} from './adapters'

export function updateCandlesticSeries(
  isWss: boolean,
  data__: BinanceRestApiResponseTypeKline | WsResponseTypeKline,
  chart: ISeriesApi<'Candlestick'>,
) {
  if (isWss) {
    UpdateChart(chart, data__ as WsResponseTypeKline)
  } else {
    let data = data__ as BinanceRestApiResponseTypeKline
    UpdateChart(chart, chartAdapter(data) as any)
  }
}

const theme_tailwind = {
  secDown: '#D04749',
  secUp: '#047D74',
}
export function updateVolumeSeries(
  isWss: boolean,
  data__: BinanceRestApiResponseTypeKline | WsResponseTypeKline,
  chart: ISeriesApi<'Histogram'>,
  colors?: { upColor: string; downColor: string },
) {
  if (!isWss) {
    if (!colors) {
      let data = data__ as BinanceRestApiResponseTypeKline
      UpdateVolume(chart, data, theme_tailwind)
    } else {
      let data = data__ as BinanceRestApiResponseTypeKline
      UpdateVolume(chart, data, {
        secDown: colors.downColor,
        secUp: colors.upColor,
      })
    }
  } else {
    if (!colors) {
      UpdateVolume(
        chart,
        volumeAdapter(data__ as any) as any,
        theme_tailwind,
      )
    } else {
      UpdateVolume(chart, volumeAdapter(data__ as any) as any, {
        secDown: colors.downColor,
        secUp: colors.upColor,
      })
    }
  }
}

export function fixed(c: coinsType) {
  switch (c) {
    case 'btc' || 'eth':
      return 6
    case 'bnb' || 'dot' || 'ltc' || 'sol':
      return 4
    default:
      return 2
  }
}
