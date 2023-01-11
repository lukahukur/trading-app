export type jwtPayload = {
  username: string
  email: string
  id: number
}
export enum Stream {
  Data = 'data',
  Transactions = 'transactions',
  Error = 'error',
  AddMoney = 'addmoney',
}

export type BinanceStreams =
  | 'btcusdt'
  | 'shibusdt'
  | 'ethusdt'
  | 'dogeusdt'
  | 'solusdt'
  | 'xrpusdt'
  | 'adausdt'
  | 'maticusdt'
  | 'dotusdt'
  | 'bnbusdt'
  | 'uniusdt'
  | 'ltcusdt'

export type coin =
  | 'btc'
  | 'shib'
  | 'eth'
  | 'doge'
  | 'sol'
  | 'xrp'
  | 'ada'
  | 'matic'
  | 'dot'
  | 'bnb'
  | 'uni'
  | 'ltc'

export type WsResponseTypeTrades = {
  e: string // Event type
  E: number // Event time
  s: string // Symbol !!! UPPERCASE
  t: number // Trade ID
  p: string // Price
  q: string // Quantity
  b: number // Buyer order ID
  a: number // Seller order ID
  T: number // Trade time
  m: boolean // Is the buyer the market maker?
  M: boolean // Ignore
}

export const arrOfStreams: BinanceStreams[] = [
  'btcusdt',
  'shibusdt',
  'ethusdt',
  'dogeusdt',
  'solusdt',
  'xrpusdt',
  'adausdt',
  'maticusdt',
  'dotusdt',
  'bnbusdt',
  'uniusdt',
  'ltcusdt',
]
