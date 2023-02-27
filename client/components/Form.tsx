import styles from '../styles/data.module.scss'
import React, {
  useState,
  useRef,
  useEffect,
  FC,
  ChangeEvent,
} from 'react'
import { typedUseSelector, typedDispatch } from '../store'
import { coinsType, Tcoins } from '../types'
import Link from 'next/link'
import { makeTransaction } from '../store/dbws'
import { Itrancation } from '../types/index'
import { setException, setMessage } from '../store/popup'

export class Throttler {
  protected timeout: number
  protected triggered: boolean = false

  constructor(protected _timeout: number) {
    this.timeout = _timeout
  }

  validationPipe = (
    validatorFn: () => { exception?: string; callback?: () => any },
    errorHandler: (s: string) => any,
    okHandler: (s: string) => any,
  ) => {
    let { callback, exception } = validatorFn()

    if (exception) {
      errorHandler(exception)
    }

    if (callback)
      this.throttle(callback).pipe((e) => {
        if (e.message) {
          return okHandler('Success')
        }

        return errorHandler(e.exception)
      })
  }

  protected throttle(callback: () => any) {
    if (!this.triggered) {
      this.triggered = true
      callback()

      setTimeout(() => {
        this.triggered = false
      }, this.timeout * 1000)

      return {
        pipe: (api: (...args: any[]) => any) => {
          return api({ message: 'Success' })
        },
      }
    }

    return {
      pipe: (api: (...args: any[]) => any) => {
        return api({
          exception: 'Please wait ' + this.timeout + ' seconds',
        })
      },
    }
  }
}

export const throttler = new Throttler(10)

// God bless an inventor of Intl
const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 4,
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 4,
})

export const formatCurrency = (e: number) => {
  if (e < 1) return formatter.format(e)
  else return e.toFixed(2).toString()
}

const Form: FC<{
  authenticated: boolean
  draw: boolean
  res: string
}> = ({ authenticated, draw, res }) => {
  const [isSelling, isMarketMaker] = useState(false)
  const sellBtn = useRef<HTMLButtonElement>(null)
  const dispatch = typedDispatch()
  const market = typedUseSelector((store) => store.market.market)
  const coin = (market as string).toUpperCase().slice(0, -4)
  const coinLowerCase = coin.toLocaleLowerCase() as coinsType
  const buyBtn = useRef<HTMLButtonElement>(null)
  const submit = useRef<HTMLButtonElement>(null)
  const usdt = typedUseSelector((store) => store.dbData.wallet.usdt)
  const currentCoinAmount = typedUseSelector(
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

  const rangeHandlerWhileSelling = (coinAmount: number) => {
    amountInput.current!.value = formatCurrency(coinAmount)

    totalInput.current!.value = formatCurrency(
      +priceInput.current!.value * +coinAmount,
    )
  }

  const rangeHandlerWhileBuying = (usdtAmount: number) => {
    totalInput.current!.value = formatCurrency(usdtAmount)
    amountInput.current!.value = formatCurrency(
      +totalInput.current!.value / +priceInput.current!.value,
    )
  }

  const inpTypeRangeChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    let part = Number(e.target.value)
    let coinAmount = +currentCoinAmount * (part / 100)
    let usdtAmount = +usdt * (part / 100)

    isSelling
      ? rangeHandlerWhileSelling(coinAmount)
      : rangeHandlerWhileBuying(usdtAmount)
  }

  //side currency price amount date
  function onSubmit() {
    throttler.validationPipe(
      () =>
        validateRequest(() =>
          dispatch(
            makeTransaction({
              side: isSelling ? 'SELL' : 'BUY',
              amount: Number(amountInput.current!.value),
              price: Number(priceInput.current!.value),
              coin: coinLowerCase,
            } as Itrancation),
          ),
        ),
      (s) => dispatch(setException({ message: s })),
      (s) => dispatch(setMessage({ message: s })),
    )
  }

  function validateRequest(callback: () => any) {
    const amount = +amountInput.current!.value
    const price = +priceInput.current!.value

    if (!amountInput.current!.value || !priceInput.current!.value) {
      return { exception: 'Empty field' }
    }

    if (amount > currentCoinAmount && isSelling) {
      return { exception: 'No enough ' + coin }
    }
    if (price * amount > usdt && !isSelling) {
      return { exception: 'No enough usdt' }
    }

    return { callback: callback }
  }

  useEffect(() => {
    if (priceInput.current) {
      /**
       * here we set inputPrice value
       */
      priceInput.current!.value =
        currentPrice && currentPrice?.s.toLowerCase() === market
          ? formatCurrency(Number(currentPrice!.c))
          : /**
             * if we aren't connected to wss stream yet, set
             * data from rest api
             * it's useful while user changed market and
             * wss endpoint has not received data yet
             */
            formatCurrency(+res)
    }
  }, [currentPrice, isSelling])

  useEffect(() => {
    /**
     * cleaning up after path is changed
     */
    if (amountInput.current) {
      priceInput.current!.value = ''
      amountInput.current!.value = ''
      totalInput.current!.value = ''
    }
  }, [coin])

  useEffect(() => {
    /**
     * coloring buttons
     */
    if (isSelling && buyBtn.current) colorSell()
    else if (!isSelling && buyBtn.current) colorBuy()
  }, [isSelling, buyBtn.current])

  useEffect(() => {
    /**
     * here we set first price
     */
    draw &&
      priceInput.current &&
      (priceInput.current!.value = formatCurrency(+res))
  }, [draw, priceInput.current])

  useEffect(() => {
    if (priceInput.current && priceInput.current!.value)
      priceInput.current!.value = ''
  }, [market])

  return authenticated ? (
    <div
      className="h-full px-4 py-7  min-w-minWForm flex-col flex "
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
      <div className="text-white mt-4 flex justify-between">
        <span>
          <span className="text-gray-200">avbl:</span>
          <span className="text-toxicPurple ml-2">
            {formatCurrency(+usdt)}
          </span>
        </span>
        <span>
          <span className="text-gray-200">{coin}:</span>
          <span className="text-yellow-300 ml-2">
            {formatCurrency(+currentCoinAmount)}
          </span>
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
          />
          <span className="text-gray-100">USDT</span>
        </span>
        <span className="flex justify-between items-center bg-light rounded-md pr-4">
          <input
            placeholder="Amount"
            ref={amountInput}
            type="number"
            onChange={(e) => {
              totalInput.current!.value = formatCurrency(
                Number(e.target.value) *
                  Number(priceInput.current!.value),
              )
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
          onChange={(e) => {
            amountInput.current!.value = formatCurrency(
              +e.target.value / +priceInput.current!.value,
            )
          }}
        />

        <button ref={submit} onClick={onSubmit}></button>
      </div>
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
