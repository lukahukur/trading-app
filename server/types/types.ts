import { Request } from "express";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export type RequestWithBody<T> = Request<{},{},T>
export type RequestWithParams<T> = Request<{},{},{},T>
  
export interface Ireq 
{
    password:string,
    email:string,
    username:string
}

export type ERR_MESSAGES = 'incorrect email or password' | 'not enough information' |
                    'password is too short'|'user already exists' | 'invalid email or your email service is not supported' |
                    "not verified" | 'not authenticated'
export type COOKIE = 'SET-COOKIE'
export type Iresponse = ERR_MESSAGES | {accessToken:string,refreshToken:string} | COOKIE;
export type Tsocket<T = any> = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, T>
export type BinanceStreams = 'btcusdt'|'shibusdt'|'ethusdt'|'dogeusdt'|'solusdt'|
                             'xrpusdt'|'adausdt'|'maticusdt'|'dotusdt'|'bnbusdt'|'uniusdt'
                             |'ltcusdt'
export type WsResponseTypeTrades = {
  t: number, // Kline start time
  T: number, // Kline close time
  s: string,  // Symbol
  i:string,      // Interval
  f: number,       // First trade ID
  L: number,       // Last trade ID
  o: string,  // Open price
  c: string,  // Close price
  h: string,  // High price
  l: string,  // Low price
  v: string,    // Base asset volume
  n: number,       // Number of trades
  x: false,     // Is this kline closed?
  q: string,  // Quote asset volume
  V: string,     // Taker buy base asset volume
  Q: string,   // Taker buy quote asset volume
  B: string   // Ignore
  }
export const arrOfStreams:BinanceStreams[] = ['btcusdt','shibusdt','ethusdt','dogeusdt','solusdt',
'xrpusdt','adausdt','maticusdt','dotusdt','bnbusdt','uniusdt'
,'ltcusdt'];

export const ERR_NO_USER = 'NO_SUCH_USER' as const;
export const ERR_INCORRECT_PASS = "INCORRECT_PASS" as const;
export const ERR_NOT_VERIFIED  = 'NOT_VERIFIED' as const;

export type Transactions = {
  id:number,
  user_id:number,
  side:'buy' | 'sell',
  amount:number,
  time:number,
  currency:BinanceStreams;
}
export type Time = '1s'|'1m'|'3m'|'5m'|'15m'|'30m'|'1h'|'2h'|'4h'|'6h'|'8h'|'12h'|'1d'|"3d"|'1w'|'1M'