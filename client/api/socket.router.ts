import { Socket } from "socket.io-client"
import { AppDispatch } from "../store"
import { getMessage } from "../store/binanceStream"
import { BinanceStreams } from "../types"

export class ListenToStream {
  protected previousMarket: BinanceStreams | undefined

  constructor(protected dispatch: AppDispatch) {}

  subscribe(market: BinanceStreams, socket: Socket) {
    if (this.previousMarket) socket.off(this.previousMarket) //unsubscribe from last one

    socket.on(market, (e) => {
      this.dispatch(getMessage(e))
    })
    this.previousMarket = market
  }
}
