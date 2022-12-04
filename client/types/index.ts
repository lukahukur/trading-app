declare global {
    interface String {
      containsNumber(): boolean;
    }
}
export type WsStreamType = '@trade'|'@depth'|'@ticker'|'@kline';
export type BinanceStreams = 'btcusdt'|'shibusdt'|'ethusdt'|'dogeusdt'|'solusdt'|
                             'xrpusdt'|'adausdt'|'maticusdt'|'dotusdt'|'bnbusdt'|'uniusdt'
                             |'ltcusdt';
export const arrOfStreams:BinanceStreams[] = ['btcusdt','shibusdt','ethusdt','dogeusdt','solusdt',
'xrpusdt','adausdt','maticusdt','dotusdt','bnbusdt','uniusdt'
,'ltcusdt'];

export type respKlineK = {
  t: number, // Kline start time
  T: number, // Kline close time
  s: string, // Symbol
  i:string,  // Interval
  f: number, // First trade ID
  L: number, // Last trade ID
  o: string,  // Open price
  c: string,  // Close price
  h: string,  // High price
  l: string,  // Low price
  v: string,  // Base asset volume
  n: number,  // Number of trades
  x: false,   // Is this kline closed?
  q: string,  // Quote asset volume
  V: string,  // Taker buy base asset volume
  Q: string,  // Taker buy quote asset volume
  B: string   // Ignore
  }
export type WsResponseTypeKline = {k:respKlineK}

  export type WsResponseTypeTicker = 
    {
      e: string ,     // Event type
      E: number,      // Event time
      s: string,      // Symbol
      p: string,      // Price change
      P: string,      // Price change percent
      w: string,      // Weighted average price
      x: string,      // First trade(F)-1 price (first trade before the 24hr rolling window)
      c: string,      // Last price
      Q: string,      // Last quantity
      b: string,      // Best bid price
      B: string,      // Best bid quantity
      a: string,      // Best ask price
      A: string,      // Best ask quantity
      o: string,      // Open price
      h: string,      // High price -- 24h
      l: string,      // Low price -- 24l
      v: string,      // Total traded base asset volume --
      q: string,      // Total traded quote asset volume
      O: number,      // Statistics open time
      C: number,      // Statistics close time
      F: number,      // First trade ID
      L: number,      // Last trade Id
      n: number      // Total number of trades
    }
  export type WsResponseTypeTrade = 
  {
    e:string,      // Event type
    E: number,     // Event time
    s: string,     // Symbol
    t: number,     // Trade ID
    p: string,     // Price
    q: string,     // Quantity
    b: number,     // Buyer order ID
    a: number,     // Seller order ID
    T: number,     // Trade time
    m: boolean,    // Is the buyer the market maker?
    M: boolean     // Ignore
  };
  export type WsResponseTypeDepth = 
  {
    e: string,      // Event type
    E: number,      // Event time
    s: string,      // Symbol
    U: number,      // First update ID in event
    u: number,      // Final update ID in event
    b: [            // Bids to be updated
      [
        string,     // Price level to be updated
        string      // Quantity
      ]
    ],
    a: [            // Asks to be updated
      [
        string,     // Price level to be updated
        string      // Quantity
      ]
    ]
  }

export type BinanceRestApiResponseType = [number, //open time
                                          string, //open price
                                          string, // high price,
                                          string, //Low price
                                          string, //close price
                                          string,//volume
                                          number,//kline close time
                                          string,//quote asset volume
                                          number,//number of trades
                                          string,//taker buy base asset volume
                                          string,//taker buy quote asset volume
                                          string,//just ignore
                                        ];
export type Time = '1s'|'1m'|'3m'|'5m'|'15m'|'30m'|'1h'|'2h'|'4h'|'6h'|'8h'|'12h'|'1d'|"3d"|'1w'|'1M'
export type TdepthRestApi = {
  lastUpdateId: number,
  bids: [
    [
      string,     // PRICE
      string    // QTY
    ]
  ],
  asks: [
    [
      string,     // PRICE
      string    // QTY
    ]
  ]
}
export type restApiBinanceTradesResponse = 
  {
    id: number,
    price: string,
    qty: string,
    quoteQty: string,
    time: number,
    isBuyerMaker: boolean,
    isBestMatch: boolean
  }

  export type tailwindTheme ={
    darkest: string,
    lessDarker: string,
    light: string,
    lightest: string,
    moreLighter: string,
    smth: string,
    toxicBlue: string,
    toxicPurple: string,
    textMain:string,
    textSecondary:string,
    up:string,
    down:string,
    secUp:string,
    secDown:string
}


export type Tcoins<T> = {
  btc  :T,   
  usdt :T,   
  bnb  :T,   
  ada  :T,   
  dot  :T,   
  eth  :T,   
  ltc  :T,   
  matic:T,   
  shib :T,   
  sol  :T,   
  uni  :T,   
  xrp  :T,  
}
export type Transactions = {
    id:number,
    user_id:number,
    side:'buy' | 'sell',
    amount:number,
    time:number,
    currency:BinanceStreams,
    price:number
}