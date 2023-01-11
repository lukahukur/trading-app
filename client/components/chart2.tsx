import { createChart } from 'lightweight-charts'
import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
} from 'react'
import { updateCandlesticSeries, updateVolumeSeries } from '../api'
import { typedDispatch, typedUseSelector } from '../store'
import {
  arrOfStreams,
  BinanceRestApiResponseTypeKline,
  BinanceStreams,
  tailwindTheme,
  WsResponseTypeKline,
} from '../types'
import { wsController } from '../api/api'
import styles from '../styles/Market.module.scss'
import config from '../tailwind.config'
import { setData } from '../store/klineSlice'

const themeTailwind: tailwindTheme = config.theme!.extend!
  .colors as any

const Chart: FC<{
  market: BinanceStreams
  data: BinanceRestApiResponseTypeKline[]
  renderChart: boolean
}> = ({ market, data, renderChart }) => {
  const interval = typedUseSelector((state) => state.market.time)
  const theme = typedUseSelector((state) => state.theme)
  const container = useRef<HTMLDivElement>(null)
  const [prices, setPrices] = useState<{
    open: number
    close: number
    high: number
    low: number
  } | null>()

  const dispatch = typedDispatch()

  let cleanUp = useMemo(() => {
    return null
  }, [market])
  let a = 850

  useLayoutEffect(() => {
    const { message, wsClose } = wsController(
      market,
      '@kline',
      interval,
    )
    const handleResize = () => {
      window.innerWidth - 700 >= a
        ? chart.applyOptions({ width: window.innerWidth - 700 })
        : chart.applyOptions({ width: a })
    }

    setPrices(cleanUp)

    var chart = createChart(container.current!, {
      width:
        window.innerWidth - 700 >= a ? window.innerWidth - 700 : a,
      height: 410,
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
        axisDoubleClickReset: true,
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderVisible: false,
      },
      layout: {
        //#171C29
        backgroundColor: themeTailwind.lessDarker,
        textColor: themeTailwind.textSecondary,
        fontFamily: 'bPl',
      },
      grid: {
        vertLines: {
          color: 'rgba(42, 46, 57, 0.6)',
        },
        horzLines: {
          color: 'rgba(42, 46, 57, 0.6)',
        },
      },
      timeScale: {
        timeVisible: true,
      },
    })

    //show numbers after point
    const mapOfStreams: any = {}
    for (let key of arrOfStreams) {
      switch (key) {
        case 'adausdt':
          mapOfStreams[key] = 0.0001
          break
        case 'shibusdt':
          mapOfStreams[key] = 0.0000001
          break
        case 'xrpusdt':
          mapOfStreams[key] = 0.0001
          break
        case 'maticusdt':
          mapOfStreams[key] = 0.0001
          break
        case 'dogeusdt':
          mapOfStreams[key] = 0.0001
          break
        default:
          mapOfStreams[key] = 0.01
      }
    }

    var candlestick = chart.addCandlestickSeries({
      upColor: themeTailwind.up,
      downColor: themeTailwind.down,
      priceFormat: {
        type: 'price',
        minMove: mapOfStreams[market],
      },
    })

    let volumeSeries = chart.addHistogramSeries({
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })
    chart.subscribeCrosshairMove((e) => {
      if (e.seriesPrices.entries().next().value) {
        setPrices({
          close: e.seriesPrices.entries().next().value[1].close,
          open: e.seriesPrices.entries().next().value[1].open,
          high: e.seriesPrices.entries().next().value[1].high,
          low: e.seriesPrices.entries().next().value[1].low,
        })
      }
    })
    let colorSchemeVolumeSeries = {
      upColor: themeTailwind.secUp,
      downColor: themeTailwind.secDown,
    }
    if (data) {
      data.forEach((e) => {
        updateVolumeSeries(
          false,
          e,
          volumeSeries,
          colorSchemeVolumeSeries,
        )
        updateCandlesticSeries(false, e, candlestick)
      })
    }
    const { removeMessageListener } = message((e) => {
      let data = e as WsResponseTypeKline
      dispatch(setData(data))
      updateCandlesticSeries(true, data, candlestick)
      updateVolumeSeries(
        true,
        data,
        volumeSeries,
        colorSchemeVolumeSeries,
      )
    })
    window.addEventListener('resize', handleResize)
    return () => {
      removeMessageListener()
      window.removeEventListener('resize', handleResize)
      chart?.remove()
      wsClose()
    }
  }, [data, interval, theme, market])

  return (
    <>
      <div ref={container} />
      <div className={styles.candlestickSeriesPrices}>
        {prices && (
          <span className={styles.candleP_wrapper}>
            <span>
              <span className="text-white">Open </span>
              <span className="text-toxicPurple">
                {prices!.open}{' '}
              </span>
            </span>
            <span>
              <span className="text-white">Close </span>
              <span className="text-yellow-500">
                {prices!.close}{' '}
              </span>
            </span>
            <br />
            <span>
              <span className="text-white">High </span>
              <span className="text-green-600">{prices!.high} </span>
            </span>
            <span>
              <span className="text-white">Low </span>
              <span className="text-red-500">{prices!.low} </span>
            </span>
          </span>
        )}
      </div>
    </>
  )
}
export default Chart
