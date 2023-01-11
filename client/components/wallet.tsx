import React, { FC, useEffect } from 'react'
import { tailwindTheme, Tcoins } from '../types'
import { typedDispatch, typedUseSelector } from '../store'
import config from '../tailwind.config'
import styles from '../styles/data.module.scss'
import { useLogoutMutation } from '../store/_api'
import { addMoney } from '../store/dbws'

const themeTailwind: tailwindTheme = config.theme!.extend!
  .colors as any

const Wallet: FC<{ authenticated: boolean }> = ({
  authenticated,
}) => {
  const coins = typedUseSelector((store) => store.dbData.wallet)
  const [logout, { error, data, isSuccess }] = useLogoutMutation()

  const dispatch = typedDispatch()

  if (isSuccess) window.location.href = '/'

  function coinsMap(c: any) {
    let nodes = []
    for (let elem in c) {
      nodes.push([elem, c[elem]])
    }
    return nodes.map((e, i) => {
      return (
        <li
          key={i}
          className="flex justify-between h-12 items-center "
        >
          <span
            className={
              e[0] === 'usdt' ? 'text-green-600' : 'text-zinc-300'
            }
          >
            {e[0].toUpperCase()}
          </span>
          {e[0] === 'usdt' && (
            <>
              {' '}
              <button
                onClick={() => dispatch(addMoney({ price: 1000 }))}
                className="flex items-center justify-center rounded-full bg-green-700 w-12 text-sm text-white"
              >
                +100
              </button>
              <button
                onClick={() => dispatch(addMoney({ price: 1000 }))}
                className="flex items-center justify-center rounded-full bg-green-700 w-8 text-sm text-white"
              >
                +1k
              </button>
              <button
                onClick={() => dispatch(addMoney({ price: 10000 }))}
                className="flex items-center justify-center rounded-full bg-green-700 w-10 text-sm text-white"
              >
                +10k
              </button>
            </>
          )}
          <span>
            {e[0] === 'usdt'
              ? Number(e[1]).toLocaleString()
              : Number(e[1])}
          </span>
        </li>
      )
    })
  }

  return authenticated ? (
    <span
      style={{ fontFamily: 'bPl' }}
      className="text-gray-200 p-4 flex flex-col w-full h-full"
    >
      <span className="flex justify-between">
        <span>Wallet</span>
        <button className="text-toxicBlue" onClick={() => logout('')}>
          Log out
        </button>
      </span>
      <ul className={styles.coins}>{coinsMap(coins)}</ul>
    </span>
  ) : (
    <></>
  )
}
export default React.memo(
  Wallet,
  (prev, next) => prev.authenticated === next.authenticated,
)
