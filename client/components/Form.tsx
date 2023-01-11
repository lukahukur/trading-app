import styles from '../styles/data.module.scss'
import React, {
  useState,
  useRef,
  useEffect,
  FC,
  ChangeEvent,
} from 'react'
import config from '../tailwind.config'
import { typedUseSelector, typedDispatch } from '../store'
import { coinsType, tailwindTheme, Tcoins } from '../types'
import Link from 'next/link'
import { fixed } from '../api/index'
import { makeTransaction } from '../store/dbws'
import { Itrancation } from '../types/index'
import { validateConfig } from 'next/dist/server/config-shared'

const themeTailwind: tailwindTheme = config.theme!.extend!
  .colors as any

const Form: FC<{
  authenticated: boolean
  draw: boolean
  res: string
}> = ({ authenticated, draw, res }) => {
  const [getError, setError] = useState('')
  const [isSelling, isMarketMaker] = useState(false)
  const sellBtn = useRef<HTMLButtonElement>(null)
  const dispatch = typedDispatch()
  const market = typedUseSelector((store) => store.market.market)
  const coin = (market as string).toUpperCase().slice(0, -4)
  const coinLowerCase = coin.toLocaleLowerCase() as coinsType
  const buyBtn = useRef<HTMLButtonElement>(null)
  const submit = useRef<HTMLButtonElement>(null)
  const usdt = typedUseSelector((store) => store.dbData.wallet.usdt)
  const currentCoin = typedUseSelector(
    (store) => store.dbData.wallet,
  )[coin.toLocaleLowerCase() as keyof Tcoins<number>]
  const priceInput = useRef<HTMLInputElement>(null)
  const amountInput = useRef<HTMLInputElement>(null)
  const totalInput = useRef<HTMLInputElement>(null)
  const currentPrice = typedUseSelector((s) => s.kline.data)?.k

  function colorSell() {
    buyBtn.current!.style.background = '#374151'
    buyBtn.current!.style.color = 'white'
    sellBtn.current!.style.background = 'hsl(0, 100%, 24%)'
    submit.current!.innerText = 'Sell'
    sellBtn.current!.style.color = 'black'
    submit.current!.style.background = 'hsl(0, 100%, 24%)'
  }

  function colorBuy() {
    sellBtn.current!.style.background = '#374151'
    buyBtn.current!.style.background = 'hsl(142, 76%, 34%)'
    buyBtn.current!.style.color = 'black'
    sellBtn.current!.style.color = 'white'
    submit.current!.innerText = 'Buy'
    submit.current!.style.background = 'hsl(142, 76%, 34%)'
  }

  const inpTypeRangeChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    let part = Number(e.target.value)
    let amount = Number(
      (currentCoin * (part / 100)).toFixed(fixed(coinLowerCase)),
    )
    amountInput.current!.value = amount.toString()
    totalInput.current!.value = (
      Number(priceInput.current!.value) * amount
    )
      .toFixed(2)
      .toString()
  }

  //side currency price amount date
  function onSubmit() {
    validateRequest(() =>
      dispatch(
        makeTransaction({
          side: isSelling ? 'SELL' : 'BUY',
          amount: Number(amountInput.current!.value),
          price: Number(priceInput.current!.value),
          coin: coinLowerCase,
        } as Itrancation),
      ),
    )
  }

  function validateRequest(callback: () => any) {
    const cleanUp = () => setTimeout(() => setError(''), 3000)
    if (
      Number(amountInput.current!.value) > currentCoin &&
      isSelling
    ) {
      setError('No enough ' + coin)
      return cleanUp()
    }
    if (
      Number(priceInput.current!.value) *
        Number(amountInput.current!.value) >
        usdt &&
      !isSelling
    ) {
      setError('No enough usdt')
      return cleanUp()
    }
    if (!amountInput.current!.value || !priceInput.current!.value) {
      setError('Empty field')
      return cleanUp()
    }
    return callback()
  }

  useEffect(() => {
    if (priceInput.current)
      priceInput.current!.value = currentPrice
        ? Number(isSelling ? currentPrice!.h : currentPrice!.l)
            .toFixed(2)
            .toString()
        : ''
  }, [currentPrice, isSelling])

  useEffect(() => {
    if (draw && priceInput.current) {
      priceInput.current!.value = Number(
        Number(res).toFixed(fixed(coinLowerCase)),
      ).toString()
    }
  }, [draw])

  useEffect(() => {
    if (amountInput.current) {
      priceInput.current!.value = ''
      amountInput.current!.value = ''
      totalInput.current!.value = ''
    }
  }, [coin])

  useEffect(() => {
    if (isSelling && buyBtn.current) colorSell()
    else if (!isSelling && buyBtn.current) colorBuy()
  }, [isSelling])

  return authenticated ? (
    <div
      className="h-full px-4 py-7  min-w-minWForm flex flex-col"
      style={{ fontFamily: 'bPl' }}
    >
      <div className={styles.inputs}>
        <button onClick={() => isMarketMaker(false)} ref={buyBtn}>
          Buy
        </button>
        <button onClick={() => isMarketMaker(true)} ref={sellBtn}>
          Sell
        </button>
      </div>
      <div className="text-white mt-4">
        <span className="text-gray-200">avbl:</span>
        <span className="text-toxicPurple ml-2">
          {Number(usdt).toLocaleString()}
        </span>
      </div>
      <div className={styles.inp_wrapper}>
        <span className="flex justify-between items-center bg-light rounded-md pr-4">
          <input
            placeholder="Price"
            ref={priceInput}
            type="number"
            onFocus={(e) => {
              e.target.blur()
            }}
            onChange={(e) => {
              totalInput.current!.value = (
                Number(e.target.value) *
                Number(amountInput.current!.value)
              ).toString()
            }}
          />
          <span className="text-gray-100">USDT</span>
        </span>
        <span className="flex justify-between items-center bg-light rounded-md pr-4">
          <input
            placeholder="Amount"
            ref={amountInput}
            type="number"
            onChange={(e) => {
              totalInput.current!.value = (
                Number(e.target.value) *
                Number(priceInput.current!.value)
              ).toString()
            }}
          />
          <span className="text-gray-100">{coin}</span>
        </span>

        <input
          onChange={inpTypeRangeChangeHandler}
          type="range"
          defaultValue={0}
          min={0}
          max={100}
          step={0.001}
          className="h-11"
        />

        <input
          ref={totalInput}
          className="h-11 w-full bg-light rounded-md p-4 text-gray-200 outline-none"
          placeholder="Total"
          type="number"
          onFocus={(e) => {
            e.target.blur()
          }}
        />

        <button ref={submit} onClick={onSubmit}></button>
      </div>
      {
        <span className="mt-4 text-red-600 h-8 flex items-center justify-center">
          {getError}
        </span>
      }
    </div>
  ) : (
    //
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
export default React.memo(Form, (prev, next) =>
  prev.authenticated === next.authenticated && prev.draw === next.draw
    ? true
    : false,
)
