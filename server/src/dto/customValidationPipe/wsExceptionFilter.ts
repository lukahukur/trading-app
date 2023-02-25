import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { ThrottlerException } from '@nestjs/throttler'
import {
  BaseWsExceptionFilter,
  WsException,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'

@Catch(WsException, ThrottlerException)
export class BadRequestExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // Here you have the exception and you can check the data
    const wsException = (new WsException(exception).getError() as any)
      .error
    const TException = new ThrottlerException(exception).getStatus()

    const client = host.switchToWs().getClient() as Socket

    client.emit('error', wsException)

    if (TException) client.emit('throttler_error', TException)
  }
}
