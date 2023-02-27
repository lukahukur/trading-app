import { useCallback, useEffect } from 'react'
import { typedUseSelector, typedDispatch } from '../store'
import {
  restApiBinanceTradesResponse,
  WsResponseTypeTrade,
} from '../types'
import styles from '../styles/data.module.scss'
import { NextPage } from 'next'

let tradeList: Pick<WsResponseTypeTrade, 'p' | 'q' | 'T' | 'm'>[] = []

const Trades: NextPage<{
  responseTrades: Pick<
    restApiBinanceTradesResponse,
    'price' | 'qty' | 'time' | 'isBuyerMaker'
  >[]
}> = ({ responseTrades }) => {
  const trades = typedUseSelector(
    (store) => store.binanceStreamSlice.data,
  ) as WsResponseTypeTrade

  const memoized = useCallback(() => {
    if (tradeList.length < 18) {
      trades.p && tradeList.unshift(trades)
    } else {
      trades.p && tradeList.unshift(trades)
      tradeList.pop()
    }
  }, [trades])
  useEffect(() => {
    responseTrades.forEach((e) => {
      tradeList.unshift({
        p: e.price,
        q: e.qty,
        T: e.time,
        m: e.isBuyerMaker,
      })
    })
    return () => {
      tradeList = []
    }
  }, [responseTrades])

  useEffect(() => {
    memoized()
  }, [trades])
  return (
    <span style={{ fontFamily: 'bPl' }}>
      <span className="text-white grid w-full px-4 mt-4 grid-cols-2">
        <span className="flex w-52 justify-between">
          <span className="w-22 items-center">Price</span>
          <span className="w-22 flex justify-end items-end">
            Amount
          </span>
        </span>
        <span className="flex justify-end items-end">Total</span>
      </span>
      <ul className="mt-1">
        {trades.p &&
          tradeList.map((e, i) => {
            //MAGIC
            let date = new Date(e.T).toLocaleTimeString()
            let isSeller = e.m
              ? { color: 'red' }
              : { color: '#16A34A' }

            return (
              <li
                key={i}
                className="grid px-4 text-sm justify-between items-center grid-cols-2"
              >
                <span className="flex w-52 justify-between">
                  <span
                    style={isSeller}
                    className="w-22  text-green-600 items-center"
                  >
                    {Number(e.p)}
                  </span>
                  <span className="w-22 text-gray-300 flex justify-end items-end">
                    {Number(e.q)}
                  </span>
                </span>
                <span className="text-gray-300 flex justify-end items-end">
                  {date}
                </span>
              </li>
            )
          })}
      </ul>
    </span>
  )
}
export default Trades
