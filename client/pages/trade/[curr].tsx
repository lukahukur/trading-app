import { GetServerSideProps, NextPage } from 'next'
import Interval from '../../components/chartInterval'
import { useEffect, useState, useLayoutEffect } from 'react'
import { typedDispatch, typedUseSelector, store } from '../../store'
import { startConnecting } from '../../store/binanceStream'
import { changeMarket } from '../../store/market'
import {
  arrOfStreams,
  BinanceRestApiResponseTypeKline,
  BinanceStreams,
  TdepthRestApi,
  IndexPageTrades,
} from '../../types/index'
import { startConnToDataWs } from '../../store/dbws'
import dynamic from 'next/dynamic'
import styles from '../../styles/Market.module.scss'
import Ticker from '../../components/ticker'
import Preloader from '../../components/preloader'
import Orders from '../../components/orderbook'
import Trades from '../../components/trades'
import Bids from '../../components/bids'
import Form from '../../components/Form'
import Wallet from '../../components/wallet'
import {
  getDataFromBinanceApiKline,
  getDataFromBinanceApiDepth,
} from '../../api/api'
import { getKlineRecordCount } from '../../api/constant'
import Head from 'next/head'
import axios from 'axios'
import { decode, JwtPayload } from 'jsonwebtoken'
import Success from '../../components/popups/success'
import Failure from '../../components/popups/error'

let fired = false

const Chart = dynamic(() => import('../../components/chart2'), {
  ssr: false,
})

const Page: NextPage<IndexPageTrades> = ({
  market,
  response,
  responseDepth,
  responseTrades,
}) => {
  const dispatch = typedDispatch()
  const interval = typedUseSelector((state) => state.market.time)
  const [dataState, setData] =
    useState<BinanceRestApiResponseTypeKline[]>(response)
  const [renderChart, allowToRender] = useState<boolean>(false)
  const theme = typedUseSelector((s) => s.theme)
  const [depth, setDepth] = useState<TdepthRestApi>(responseDepth)
  const connected = typedUseSelector(
    (store) => store.binanceStreamSlice.connected,
  )
  const [authenticated, setAuthState] = useState(false)
  let controller1 = new AbortController()
  let controller2 = new AbortController()

  useEffect(() => {
    getDataFromBinanceApiKline(market, interval, controller1)
      .then((e) => {
        setData(e)
      })
      .catch((_) => {})
    getDataFromBinanceApiDepth(market, controller2)
      .then((e) => {
        setDepth(e)
      })
      .catch((_) => {})

    return () => {
      controller1.abort()
      controller2.abort()
    }
  }, [interval, market])

  useEffect(() => {
    connected && dispatch(changeMarket(market))
  }, [market, connected])

  useEffect(() => {
    let token = localStorage.getItem('access')

    if (!fired) {
      //checking if token is valid
      if (token) {
        let { exp } = decode(token) as JwtPayload

        if (Date.now() >= exp! * 1000) {
          setAuthState(false)
        } else setAuthState(true)
      } else setAuthState(false)
      /**
       * connecting to the streams
       */
      dispatch(startConnecting())
      dispatch(startConnToDataWs())
    }
    return () => {
      fired = true
    }
  }, [])

  let title = 'Spot ' + market.toUpperCase()
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.parent}>
        {!renderChart && (
          <span className="fixed w-full h-full overflow-hidden rounded-md bg-darkest top-0 left-0 z-10000  flex items-center justify-center overflow-x-hidden">
            <Preloader
              firstColor={theme.secondaryUp}
              secondColor={theme.secondaryDown}
            />
          </span>
        )}
        <Failure />
        <Success />
        <div className={styles.chartWrp}>
          <Ticker
            drawPreloader={(e: boolean) => {
              allowToRender(e)
            }}
          />
          <Interval />
          <Chart
            market={market}
            authenticated={authenticated}
            data={dataState}
            res={dataState[dataState.length - 1][2] as any}
          />
        </div>

        <div className={styles.order}>
          <Orders response={depth} />
        </div>

        <div className={styles.form}>
          <Form
            authenticated={authenticated}
            draw={renderChart}
            res={dataState[dataState.length - 1][2] as any}
          />
        </div>

        <div className={styles.bids}>
          <Bids
            authenticated={authenticated}
            draw={renderChart}
            res={dataState[dataState.length - 1][2] as any}
            setAuthState={(e) => setAuthState(e)}
          />
        </div>

        <div className={styles.trades}>
          <Trades responseTrades={responseTrades} />
        </div>
        <div className={styles.wallet}>
          <Wallet
            authenticated={authenticated}
            setAuthState={(e) => setAuthState(e)}
          />
        </div>
      </div>
    </>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  resolvedUrl,
}) => {
  let interval = store().getState().market.time
  let stream = resolvedUrl.split('/')[2] as BinanceStreams
  let canPass = arrOfStreams.includes(stream)
  if (!canPass) return { notFound: true }

  let response = await axios.get(
    `https://api.binance.com/api/v3/klines?symbol=${stream.toUpperCase()}&interval=${interval}&limit=${getKlineRecordCount}`,
  )

  let responseDepth = await axios.get(
    `https://api.binance.com/api/v3/depth?symbol=${stream.toUpperCase()}&limit=10`,
  )

  let responseTrades = await axios.get(
    `https://api3.binance.com/api/v3/trades?symbol=${stream.toUpperCase()}&limit=${18}`,
  )

  return {
    props: {
      market: resolvedUrl.split('/')[2],
      response: response.data,
      responseDepth: responseDepth.data,
      responseTrades: responseTrades.data,
    },
  }
}
