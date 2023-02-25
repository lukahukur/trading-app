import { createChart } from 'lightweight-charts'
import {
  FC,
  useEffect,
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
  Itrancation,
  Tcoins,
  WsResponseTypeKline,
} from '../types'
import { wsController } from '../api/api'
import styles from '../styles/Market.module.scss'
import { setData } from '../store/klineSlice'
import { makeTransaction } from '../store/dbws'

const Chart: FC<{
  market: BinanceStreams
  authenticated: boolean
  data: BinanceRestApiResponseTypeKline[]
  res: string
}> = ({ market, data, res, authenticated }) => {
  const interval = typedUseSelector((state) => state.market.time)
  const theme = typedUseSelector((state) => state.theme)
  const container = useRef<HTMLDivElement>(null)
  const [prices, setPrices] = useState<{
    open: number
    close: number
    high: number
    low: number
  } | null>()
  const [size, setSize] = useState(-1)
  const dispatch = typedDispatch()

  useEffect(() => {
    const setWindowSize = () => {
      setSize(window.innerWidth)
    }

    setSize(window.innerWidth)
    window.addEventListener('resize', setWindowSize)
    return () => {
      window.removeEventListener('resize', setWindowSize)
    }
  }, [])

  useLayoutEffect(() => {
    const { message, wsClose } = wsController(
      market,
      '@kline',
      interval,
    )

    const handleResize = (apply: boolean) => {
      let w = window.innerWidth

      if (1536 < w) {
        apply &&
          chart.applyOptions({ width: window.innerWidth - 700 })

        return window.innerWidth - 700
      }

      if (w > 1280 && w <= 1536) {
        apply &&
          chart.applyOptions({ width: window.innerWidth - 355 })
        return window.innerWidth - 355
      }

      if (w > 1024 && w <= 1280) {
        apply && chart.applyOptions({ width: window.innerWidth - 35 })
        return window.innerWidth - 35
      }

      apply && chart.applyOptions({ width: 990 })
      return 990
    }

    const resizeHandlerTrue = () => {
      handleResize(true)
    }

    setPrices(null)

    var chart = createChart(container.current!, {
      width: handleResize(false),
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
        backgroundColor: 'hsl(230, 30%, 9%)',
        textColor: '#9ca3af',
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
      upColor: 'rgba(38,198,218, 0.56)',
      downColor: 'rgba(239,83,80, 0.4)',
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
      upColor: '#047D74',
      downColor: '#D04749',
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

    window.addEventListener('resize', resizeHandlerTrue)

    return () => {
      removeMessageListener()
      window.removeEventListener('resize', resizeHandlerTrue)
      chart?.remove()
      wsClose()
    }
  }, [data, interval, theme, market])

  return (
    <>
      <div ref={container} />
      {size <= 1536 && authenticated && (
        <MiniForm market={market} res={res} />
      )}
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

const MiniForm: FC<{ market: BinanceStreams; res: string }> = ({
  market,
  res,
}) => {
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY')
  const coin = (market as string).toUpperCase().slice(0, -4)
  const currentPrice = typedUseSelector((s) => s.kline.data)?.k
  const currentCoinAmount = typedUseSelector(
    (store) => store.dbData.wallet,
  )[coin.toLocaleLowerCase() as keyof Tcoins<number>]
  const wallet = typedUseSelector((store) => store.dbData.wallet)
  const [getError, setError] = useState('')
  const usdt = typedUseSelector((store) => store.dbData.wallet.usdt)
  const dispatch = typedDispatch()
  const amount = useRef<HTMLInputElement>(null)
  const bestPrice = useRef<string | undefined>(undefined)

  useEffect(() => {
    bestPrice.current = currentPrice?.c
  }, [currentPrice])

  useEffect(() => {
    bestPrice.current = undefined
  }, [market])

  useEffect(() => {
    // before stream is loaded, I sat those value to prevent undefinded
    bestPrice.current = res
  }, [res])

  function onSubmit() {
    let a = +amount.current!.value
    validateRequest(() =>
      dispatch(
        makeTransaction({
          side: side,
          amount: a,
          price: +bestPrice.current!,
          coin: coin.toLocaleLowerCase(),
        } as Itrancation),
      ),
    )
  }
  const validateRequest = (c: (...args: any[]) => void) => {
    const cleanUp = () => setTimeout(() => setError(''), 3000)

    if (!amount.current!.value) {
      setError('Empty field')
      return cleanUp()
    }
    if (
      !bestPrice.current ||
      currentPrice?.s.toLowerCase() !== market
    ) {
      setError('Wait please')
      return cleanUp()
    }

    if (
      +amount.current!.value > +currentCoinAmount &&
      side === 'SELL'
    ) {
      setError('No enough ' + coin)
      return cleanUp()
    }

    if (
      +bestPrice.current * +amount.current!.value > usdt &&
      side === 'BUY'
    ) {
      setError('No enough usdt')
      return cleanUp()
    }

    return c()
  }

  return (
    <div
      style={{
        top: '200px',
        left: '50px',
      }}
      className="absolute z-40 flex-col flex"
    >
      <span className="text-white w-40  flex justify-between ">
        <button
          style={
            side === 'BUY'
              ? { background: 'green', color: 'black' }
              : { background: 'rgb(55, 65, 81)' }
          }
          onClick={() => setSide('BUY')}
          className="flex w-1/2 justify-center items-center rounded-l-md text-sm h-6"
        >
          BUY
        </button>
        <button
          style={
            side === 'SELL'
              ? { background: 'rgb(122, 0, 0)', color: 'black' }
              : { background: 'rgb(55, 65, 81)' }
          }
          onClick={() => setSide('SELL')}
          className="flex w-1/2 text-sm justify-center items-center rounded-r-md text-white"
        >
          SELL
        </button>
      </span>
      <input
        placeholder={`Amount ${coin}`}
        ref={amount}
        type="text"
        className="h-6 px-2 w-40 text-sm bg-light rounded-md mt-2 text-gray-200 outline-none"
      />
      <button
        onClick={onSubmit}
        className="h-6 px-2 text-sm w-40 bg-light rounded-md mt-2 text-gray-200 outline-none"
      >
        {!getError ? (
          'Sumbit'
        ) : (
          <span className="text-red-600">{getError}</span>
        )}
      </button>
    </div>
  )
}
export default Chart
