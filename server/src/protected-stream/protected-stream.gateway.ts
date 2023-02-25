import {
  UseGuards,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common'
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from 'src/strategy/jwt.stategy'
import { ProtectedStreamService } from './protected-stream.service'
import { Stream } from '../../types/types'
import { TransactionObject, MoneyDTO } from 'src/dto/user.dto'
import { UseFilters, UsePipes } from '@nestjs/common/decorators'
import { BadRequestExceptionsFilter } from 'src/dto/customValidationPipe/wsExceptionFilter'
import { WsThrottlerGuard } from './wsThrottler.service'

let validationPipeOptions: ValidationPipeOptions = {
  exceptionFactory(validationErrors: ValidationError[] = []) {
    // Here are the errors
    if (this.isDetailedOutputDisabled) {
      return new WsException(validationErrors)
    }
    const errors = this.flattenValidationErrors(validationErrors)

    return new WsException(errors)
  },
}

@WebSocketGateway({
  namespace: 'userdata',
})
export class ProtectedStreamGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server
  constructor(private streamService: ProtectedStreamService) {}

  @SubscribeMessage(Stream.Data)
  @UseGuards(JwtAuthGuard, WsThrottlerGuard)
  @UseFilters(BadRequestExceptionsFilter)
  async handleDataStream(client: any) {
    let resp = await this.streamService.personalData(client.user.id)
    return { event: Stream.Data, data: resp }
  }

  @SubscribeMessage(Stream.Transactions)
  @UseGuards(JwtAuthGuard, WsThrottlerGuard)
  @UsePipes(new ValidationPipe(validationPipeOptions))
  @UseFilters(BadRequestExceptionsFilter)
  async handleTransactions(
    @ConnectedSocket() client: any,
    @MessageBody() data: TransactionObject,
  ) {
    let req = await this.streamService.transaction(
      data,
      client.user.id,
    )
    if (req.error) return { event: Stream.Error, data: req.error }
    let response = this.handleDataStream(client)

    return response
  }

  @SubscribeMessage(Stream.AddMoney)
  @UseGuards(JwtAuthGuard, WsThrottlerGuard)
  @UsePipes(new ValidationPipe(validationPipeOptions))
  @UseFilters(BadRequestExceptionsFilter)
  async addMoney(
    @ConnectedSocket() client: any,
    @MessageBody() data: MoneyDTO,
  ) {
    let req = await this.streamService.addMoney(
      client.user.id,
      data.price,
    )

    if (req.error) return { event: Stream.Error, data: req.error }
    let response = this.handleDataStream(client)

    return response
  }

  async handleConnection(client: Socket) {
    let token = client.handshake.auth.token

    if (!token) return client.disconnect()

    let payload = await this.streamService.handleConnection(token)

    if (!payload) return client.disconnect()

    let response = await this.streamService.personalData(payload.id)

    client.emit(Stream.Data, response)
  }
}
