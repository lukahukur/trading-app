import react, { FC } from 'react'
import { Transactions } from '../types'

const Transaction: FC<{ e: Transactions; time: Date }> = ({
  e,
  time,
}) => {
  return (
    <>
      <span
        className={
          e.side === 'BUY' ? 'text-green-600' : 'text-red-500'
        }
      >
        {e.side.toUpperCase()}
      </span>
      <span className="text-toxicPurple">
        {e.currency.toUpperCase()}
      </span>
      <span className="text-gray-400">{e.price}</span>
      <span className="text-gray-400">{e.amount}</span>
      <span className="text-gray-400">
        {time.getFullYear()}-{Number(time.getMonth()) + 1}-
        {time.getDate()} {time.getHours()}:{time.getMinutes()}
      </span>
    </>
  )
}
export default Transaction
