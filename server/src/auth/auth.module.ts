import { Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from '../prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '../strategy/jwt.stategy'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from '../strategy/auth.strategy'
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard } from '@nestjs/throttler'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({}),
    JwtModule.register({}),
    PassportModule.register({}),
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 4,
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
