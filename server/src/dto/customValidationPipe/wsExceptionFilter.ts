import { ArgumentsHost, Catch } from '@nestjs/common'
import {
  BaseWsExceptionFilter,
  WsException,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'

@Catch(WsException)
export class BadRequestExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // Here you have the exception and you can check the data
    const wsException = (new WsException(exception).getError() as any)
      .error

    const client = host.switchToWs().getClient() as Socket
    client.emit('error', wsException)
  }
}
