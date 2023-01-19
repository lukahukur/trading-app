import React, { FC, useState, useEffect, useRef } from 'react'
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
  const [size, setSize] = useState(-1)

  const handleResize = () => setSize(window.innerWidth)

  const logout = () => {
    setAuthState(false)
    localStorage.setItem('access', '')
    window.location.href = '/'
  }

  useEffect(() => {
    setSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return authenticated ? (
    <>
      {size > 1536 ? (
        <span
          style={{
            fontFamily: 'bPl',
          }}
          className="w-full flex flex-col  text-textMain h-full px-3 py-2  "
        >
          <span>
            <button className={'text-toxicBlue'}>Orders</button>
          </span>

          <span className="flex flex-row justify-between items-start">
            <Transactions />
          </span>
        </span>
      ) : (
        <span
          style={{ fontFamily: 'bPl', height: '409px' }}
          className="flex justify-between items-start"
        >
          <Transactions />
          <span
            style={{ width: '500px', height: '100%' }}
            className=" bg-lessDarker rounded-xl ml-3"
          >
            <Wallet
              authenticated={authenticated}
              setAuthState={(e) => setAuthState(e)}
            />
          </span>
        </span>
      )}
    </>
  ) : (
    <span className="text-toxicBlue text-xl flex items-center w-full h-full justify-center bg-darkest">
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
        <span className="text-gray-200 w-10">side</span>
        <span className="text-gray-200 w-10">currency</span>
        <span className="text-gray-200 w-10">price</span>
        <span className="text-gray-200 w-10">amount</span>
        <span className="text-gray-200 w-10">date</span>
        {mappedArrayOFOrders}
      </span>
    </>
  )
}
