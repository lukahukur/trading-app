import { CurrenciesDTO } from '../../dto/user.dto'
import {
  arrOfStreams,
  BinanceStreams,
  WsResponseTypeTrades,
} from '../../../types/types'
import { WebSocket } from 'ws'
import { Injectable } from '@nestjs/common/decorators'

/**
 * this @BinanceStream class connects to the Binance stream and gets current prices of currencies
 * prices are sorted in @_prices property
 *
 * you can not access this class directly and subscribe to trade stream, because
 * stream is too fast;
 *
 * I solved this problem with pooling
 *
 */
export class BinanceStream {
  protected _directConnection: WebSocket
  protected _prices: CurrenciesDTO

  constructor() {
    this._directConnection = this.connectToStream()

    this._prices = new CurrenciesDTO()

    this._directConnection.on('close', this.onclose)
    this._directConnection.on('message', this.listener)
    this._directConnection.on('open', this.onopen)
    this._directConnection.on('error', this.onerror)

    this.handleReconnect()
  }

  protected updatePrices(
    currentMessage: WsResponseTypeTrades,
    priceObject: CurrenciesDTO,
  ) {
    let stream = currentMessage.s.toLocaleLowerCase()
    priceObject[stream] = currentMessage // assigning current price
  }

  public listener = (e: any) => {
    let message: WsResponseTypeTrades = this.decodeMessage(e)

    //it updates current price object
    this.updatePrices(message, this._prices)
  }

  protected handleReconnect() {
    setInterval(() => {
      // reconnect to binance stream every 12h
      this._directConnection.off('message', this.listener)
      this._directConnection.off('close', this.onclose)
      this._directConnection.off('open', this.onopen)
      this._directConnection.off('error', this.onerror)

      this._directConnection = this.connectToStream()

      this._directConnection.on('open', this.onopen)
      this._directConnection.on('close', this.onclose)
      this._directConnection.on('message', this.listener)
      this._directConnection.on('error', this.onerror)

      console.log('reconnecting...')
    }, 1000 * 60 * 60 * 12)
  }

  protected connectToStream() {
    let tradeStream = arrOfStreams.map((e) => e + '@trade')

    return new WebSocket(
      'wss://stream.binance.com:9443/ws/' + tradeStream.join('/'),
    )
  }

  protected decodeMessage(e: string) {
    var uint8array = new TextEncoder().encode(e)
    return JSON.parse(new TextDecoder().decode(uint8array))
  }

  close() {
    return this._directConnection.close()
  }

  onopen() {
    console.log('connected')
  }

  onerror(err) {
    console.log(err)
  }
  onclose() {
    console.log('closed')
  }
}

//pooling
@Injectable()
export class RouteManager extends BinanceStream {
  prices: CurrenciesDTO

  constructor() {
    super()

    this.prices = this._prices
    this.onerror((e) => {
      console.log(e)
    })
  }

  subscribe(
    stream: BinanceStreams,
    cb: (a: WsResponseTypeTrades) => any,
  ) {
    let previousID: number

    setInterval(() => {
      if (
        this.prices[stream] &&
        previousID !== this.prices[stream].t // is not same message
      ) {
        cb(this.prices[stream])
      }

      previousID =
        this.prices[stream] !== undefined && this.prices[stream].t
    }, 500)
  }
}
