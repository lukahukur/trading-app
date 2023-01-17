import React, {
  FC,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react'
import Link from 'next/link'
import { typedUseSelector } from '../store'
import Transaction from './transaction'
import styles from '../styles/Market.module.scss'
import Wallet from './wallet'
import Form from './Form'

const Bids: FC<{
  authenticated: boolean
  draw: boolean
  res: string
  setAuthState: (e: boolean) => void
}> = ({ authenticated, draw, res, setAuthState }) => {
  const [route, setRoute] = useState<'Buy/Sell' | 'Orders'>('Orders')
  const [size, setSize] = useState(-1)

  const handleResize = () => setSize(window.innerWidth)

  useLayoutEffect(() => {
    setSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return authenticated ? (
    <span
      style={{ fontFamily: 'bPl' }}
      className="w-full flex flex-col text-textMain h-full px-3 py-2  "
    >
      <span className="flex flex-row h-min justify-between w-36 ">
        <button
          className={
            route === 'Orders' ? 'text-toxicBlue' : 'text-gray-400'
          }
          onClick={() => setRoute('Orders')}
        >
          Orders
        </button>
        {size <= 1536 && (
          <button
            className={
              route === 'Buy/Sell'
                ? 'text-toxicBlue'
                : 'text-gray-400'
            }
            onClick={() => setRoute('Buy/Sell')}
          >
            Buy/Sell
          </button>
        )}
      </span>
      {route === 'Orders' ? (
        <Transactions />
      ) : (
        <span className="flex justify-center items-center ">
          <span
            style={{ height: '470px', width: '550px' }}
            className="relative -top-10"
          >
            <Form
              authenticated={authenticated}
              draw={draw}
              res={res}
            />
          </span>
        </span>
      )}
    </span>
  ) : (
    <span className="text-toxicBlue text-xl flex items-center w-full h-full justify-center">
      <span>
        Please{' '}
        <Link href={'../signin'}>
          <span className="underline cursor-pointer">sign in</span>
        </Link>
        <br />
        or{' '}
        <Link href={'../signup'}>
          <span className="underline cursor-pointer">
            create an account
          </span>
        </Link>
      </span>
    </span>
  )
}

export default React.memo(
  Bids,
  (prev, next) => prev.authenticated === next.authenticated,
)

const Transactions = () => {
  const orders = typedUseSelector((state) => state.dbData.orders)

  const mappedArrayOFOrders = orders.map((e: any) => {
    const time = new Date(Number(e.time))

    return <Transaction key={e.id} e={e} time={time} />
  })
  return (
    <>
      <span className={styles.bidWrapper}>
        <span className="text-gray-200 w-48">side</span>
        <span className="text-gray-200 w-48">currency</span>
        <span className="text-gray-200 w-48">price</span>
        <span className="text-gray-200 w-48">amount</span>
        <span className="text-gray-200 w-48">date</span>

        {/* here are orders */}
        {mappedArrayOFOrders}
      </span>
    </>
  )
}
