import io, { Socket } from 'socket.io-client'
import { AppDispatch, AppStore } from '.'
import { Itrancation, Transactions } from '../types'
import {
  startConnecting,
  connected,
  getMessage,
  onError,
} from './binanceStream'
import { changeMarket } from './market'
import {
  addMoney,
  error,
  getWalletData,
  makeTransaction,
  setOrders,
} from './dbws'
import { ListenToStream } from '../api/socket.router'

let socket: Socket
let socket_personalData: Socket

export const wssMiddleware: any = (store: AppStore) => {
  let subscribtionManager = new ListenToStream(store.dispatch)

  return (next: AppDispatch) => (action: any) => {
    if (changeMarket.match(action))
      subscribtionManager.subscribe(action.payload, socket)

    if (startConnecting.match(action)) {
      socket = io(process.env.NEXT_PUBLIC_BURL + '/trade', {
        transports: ['websocket'],
      })
      socket.on('connect', () => {
        store.dispatch(connected())
      })

      socket.on('connect_error', (e) => {
        store.dispatch(onError(e))
      })
      socket.on('connect_failed', (e) => {
        store.dispatch(onError(e))
      })
      socket.on('disconnect', (e) => {
        store.dispatch(onError(e))
      })
    }

    let url = process.env.NEXT_PUBLIC_BURL + '/userdata'
    if (startConnecting.match(action)) {
      socket_personalData = io(url, {
        auth: {
          token: localStorage.getItem('access'),
        },
      })

      socket_personalData.on('data', (e) => {
        let response = e

        let walletData = response[0]

        delete walletData.id
        delete walletData.user_id

        store.dispatch(getWalletData(walletData))
        let transactions: Itrancation[] = response[1]

        store.dispatch(setOrders(transactions))
      })

      socket_personalData.on('disconnect', () =>
        console.log('disconnected'),
      )
      socket_personalData.on('connect_error', (e) => error(e))

      socket_personalData.on('error', (e) => {
        error(e)
        console.log(e)
        if (e === 'invalid token') {
          localStorage.removeItem('access')
          location.reload()
        }
      })
    }

    if (makeTransaction.match(action)) {
      socket_personalData.emit('transactions', action.payload)
    }

    if (addMoney.match(action)) {
      socket_personalData.emit('addmoney', action.payload)
    }
    return next(action)
  }
}
