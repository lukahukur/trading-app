import { GetServerSideProps, NextPage } from 'next'
import Interval from '../../components/chartInterval'
import { useEffect, useState } from 'react'
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

let fired = false

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  resolvedUrl,
}) => {
  let authenticated: boolean
  const isTokenValid = await fetch(
    process.env.NEXT_PUBLIC_BURL + '/auth/authOnLoad',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        access: req.cookies.Authorization,
      }),
    },
  ).then((e) => e.json())

  let interval = store().getState().market.time
  let stream = resolvedUrl.split('/')[2] as BinanceStreams
  let canPass = arrOfStreams.includes(stream)
  if (!canPass) return { notFound: true }

  let response = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${stream.toUpperCase()}&interval=${interval}&limit=${getKlineRecordCount}`,
  ).then((e) => e.json())
  let responseDepth = await fetch(
    `https://api.binance.com/api/v3/depth?symbol=${stream.toUpperCase()}&limit=10`,
  ).then((e) => e.json())
  let responseTrades = await fetch(
    `https://api3.binance.com/api/v3/trades?symbol=${stream.toUpperCase()}&limit=${18}`,
  ).then((e) => e.json())

  if ((await isTokenValid.statusCode) === 201) authenticated = true
  else authenticated = false

  return {
    props: {
      market: resolvedUrl.split('/')[2],
      response: response,
      responseDepth: responseDepth,
      responseTrades: responseTrades,
      authenticated: authenticated,
    },
  }
}

const Chart = dynamic(() => import('../../components/chart2'), {
  ssr: false,
})

const Page: NextPage<IndexPageTrades> = ({
  market,
  response,
  responseDepth,
  responseTrades,
  authenticated,
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
    if (!fired) {
      dispatch(startConnecting())
      dispatch(startConnToDataWs())
    }
    return () => {
      fired = true
    }
  }, [])

  return (
    <>
      <Head>
        <title> Spot {market.toUpperCase()}</title>
      </Head>
      <div className={styles.parent}>
        {!renderChart && (
          <span className="fixed w-full h-full overflow-hidden rounded-md bg-darkest  z-10000  flex items-center justify-center overflow-x-hidden">
            <Preloader
              firstColor={theme.secondaryUp}
              secondColor={theme.secondaryDown}
            />
          </span>
        )}
        <div className={styles.chartWrp}>
          <Ticker
            drawPreloader={(e: boolean) => {
              allowToRender(e)
            }}
          />
          <Interval />
          <Chart
            market={market}
            renderChart={renderChart}
            data={dataState}
          />
        </div>

        <div className={styles.order}>
          <Orders response={depth} />
        </div>

        <div className={styles.form}>
          <Form
            authenticated={authenticated}
            draw={renderChart}
            res={responseTrades[0].price}
          />
        </div>

        <div className={styles.bids}>
          <Bids authenticated={authenticated} />
        </div>

        <div className={styles.trades}>
          <Trades responseTrades={responseTrades} />
        </div>
        <div className={styles.wallet}>
          <Wallet authenticated={authenticated} />
        </div>
      </div>
    </>
  )
}

export default Page
