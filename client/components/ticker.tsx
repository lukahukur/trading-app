import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useMemo,
} from 'react'
import styles from '../styles/Market.module.scss'
import { typedDispatch, typedUseSelector } from '../store'
import { wsController } from '../api/api'
import {
  BinanceStreams,
  WsResponseTypeTicker,
  WsResponseTypeTrade,
} from '../types'
import { arrOfStreams } from '../types'
import Link from 'next/link'
import { NextPage } from 'next'
import { changeMarket } from '../store/market'
import { useSelector } from 'react-redux'

const Ticker: NextPage<{ drawPreloader: (e: boolean) => void }> = ({
  drawPreloader,
}) => {
  const coin = (
    typedUseSelector((state) => state.market.market) as string
  )
    .toUpperCase()
    .slice(0, -4)
  const [streams, setStreams] = useState(arrOfStreams)
  const dispatch = typedDispatch()
  const market = typedUseSelector((state) => state.market.market)
  const interval = typedUseSelector((state) => state.market.time)
  const trades: WsResponseTypeTrade = typedUseSelector(
    (state) => state.binanceStreamSlice.data,
  )
  const [data, setData] = useState<WsResponseTypeTicker | undefined>(
    undefined,
  )
  const dropDown = useRef<HTMLDivElement>(null)

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    let input = e.target.value
    setStreams((arr) => {
      return arrOfStreams.filter((word) =>
        word.slice(0, -4).includes(input.toLocaleLowerCase().trim()),
      )
    })
  }
  useEffect(() => {
    const { message, wsClose } = wsController(
      market,
      '@ticker',
      interval,
    )
    const { removeMessageListener } = message((data) => {
      setData(data as WsResponseTypeTicker)
    })
    return () => {
      wsClose()
      removeMessageListener()
    }
  }, [market])

  useEffect(() => {
    if (data && trades.s && market) {
      let allow =
        data &&
        trades &&
        data.s.toLowerCase() === market &&
        trades.s.toLowerCase() === market
      drawPreloader(allow)
    }
  }, [market, data, trades])

  const buttonMap = useMemo(() => {
    return streams.map((element, i) => {
      return (
        <Link key={i} href={'/trade/' + element}>
          <button>
            {element.toUpperCase().slice(0, -4)}
            <span
              style={{ fontSize: '12px', marginTop: '2px' }}
              className="text-gray-400 flex items-start justify-end"
            >
              /USDT
            </span>
          </button>
        </Link>
      )
    })
  }, [streams])

  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <span className={styles.search_wrapper}>
        <span className={styles.search_box}>
          <div className={styles.hvr_wrp}>
            <input
              type="text"
              placeholder={coin + '/USDT'}
              onChange={onChange}
            />
            <span ref={dropDown} className={styles.search_dropDown}>
              {buttonMap}
            </span>
          </div>
          <button></button>
        </span>
      </span>

      {data && trades && !Number.isNaN(Number(data.h)) && (
        <span className={styles.ticker_wrapper}>
          <span
            style={
              window.innerWidth > 1570
                ? { display: 'flex' }
                : { display: 'none' }
            }
            className={styles.ticker_wrapper_price}
          >
            <span className="text-gray-400 ">Price</span>
            <span className="text-toxicPurple">
              {trades.p && Number(trades.p)}
            </span>
          </span>

          <span className={styles.ticker_wrapper_price}>
            <span className="text-gray-400">24h Low</span>
            <span>{Number(data!.l)}</span>
          </span>

          <span className={styles.ticker_wrapper_price}>
            <span className="text-gray-400">24h High</span>
            <span>{Number(data!.h)}</span>
          </span>

          <span className={styles.ticker_wrapper_price}>
            <span className="text-gray-400">
              24h Volume{' '}
              <span
                style={{ fontFamily: 'bPl' }}
                className="text-toxicPurple "
              >
                {coin}
              </span>
            </span>
            <span>{Number(data!.v)}</span>
          </span>

          <span className={styles.ticker_wrapper_price}>
            <span className="text-gray-400">24h Price Change</span>
            <span className="flex justify-between">
              <span
                style={
                  Number(data!.p) === 0
                    ? { color: 'white' }
                    : Number(data!.p) > 0
                    ? { color: '#16A34A' }
                    : { color: 'red' }
                }
              >
                {Number(data!.p)}
              </span>
              <span
                style={
                  Number(data!.P) === 0
                    ? { color: 'white' }
                    : Number(data!.P) > 0
                    ? { color: '#16A34A' }
                    : { color: 'red' }
                }
              >
                {Number(data!.P)}%
              </span>
            </span>
          </span>

          <span
            style={{ fontFamily: 'bPl' }}
            className="text-toxicBlue text-xl flex items-end"
          >
            {coin}/USDT
          </span>
        </span>
      )}
    </span>
  )
}
export default React.memo(Ticker)
