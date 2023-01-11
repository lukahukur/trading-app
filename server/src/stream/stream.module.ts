import { Module } from '@nestjs/common'
import { RouteManager } from './rawWebSocket/ws.provider'
import { StreamGateway } from './stream.gateway'

@Module({
  providers: [StreamGateway, RouteManager],
})
export class StreamModule {}
