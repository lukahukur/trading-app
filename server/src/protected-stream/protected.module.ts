import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtAuthGuard } from 'src/strategy/jwt.stategy'
import { ProtectedStreamGateway } from './protected-stream.gateway'
import { ProtectedStreamService } from './protected-stream.service'
import { ValidateTransaction } from './transactionValidation.service'

@Module({
  imports: [ConfigModule.forRoot({}), JwtModule.register({})],
  providers: [
    ProtectedStreamGateway,
    JwtAuthGuard,
    PrismaService,
    ProtectedStreamService,
    ValidateTransaction,
  ],
})
export class ProtectedStream {}
