import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { ThrottlerModule } from '@nestjs/throttler'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtAuthGuard } from 'src/strategy/jwt.stategy'
import { ProtectedStreamGateway } from './protected-stream.gateway'
import { ProtectedStreamService } from './protected-stream.service'
import { ValidateTransaction } from './transactionValidation.service'

@Module({
  imports: [
    ConfigModule.forRoot({}),
    JwtModule.register({}),
    ThrottlerModule.forRoot({ limit: 5, ttl: 60 }),
  ],
  providers: [
    ProtectedStreamGateway,
    JwtAuthGuard,
    PrismaService,
    ProtectedStreamService,
    ValidateTransaction,
  ],
})
export class ProtectedStream {}
