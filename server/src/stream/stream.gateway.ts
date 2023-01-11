import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { arrOfStreams } from '../../types/types'
import { RouteManager } from './rawWebSocket/ws.provider'

@WebSocketGateway({
  namespace: 'trade',
})
export class StreamGateway
  implements OnGatewayInit, OnGatewayConnection
{
  @WebSocketServer()
  server: Server
  constructor(public wss: RouteManager) {}

  afterInit() {
    arrOfStreams.forEach((stream) => {
      this.wss.subscribe(stream, (e) => {
        this.server.emit(stream, e)
      })
    })
  }
  handleConnection(client: any, ...args: any[]) {}
}
