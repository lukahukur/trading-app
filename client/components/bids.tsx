import React, { FC, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { typedUseSelector } from '../store'
import Transaction from './transaction'
import styles from '../styles/Market.module.scss'

const Bids: FC<{ authenticated: boolean }> = ({ authenticated }) => {
  const orders = typedUseSelector((state) => state.dbData.orders)

  const mappedArrayOFOrders = orders.map((e: any) => {
    const time = new Date(Number(e.time))

    return <Transaction key={e.id} e={e} time={time} />
  })

  return authenticated ? (
    <span
      style={{ fontFamily: 'bPl' }}
      className="w-full flex flex-col text-textMain h-full px-3 py-2  "
    >
      <span className="flex flex-row h-min justify-between w-32">
        <button className="text-toxicBlue">Orders</button>
      </span>
      <span className={styles.bidWrapper}>
        <span className="text-gray-200 w-48">side</span>
        <span className="text-gray-200 w-48">currency</span>
        <span className="text-gray-200 w-48">price</span>
        <span className="text-gray-200 w-48">amount</span>
        <span className="text-gray-200 w-48">date</span>

        {/* here are orders */}
        {mappedArrayOFOrders}
      </span>
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
