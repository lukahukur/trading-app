import { Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from '../prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '../strategy/jwt.stategy'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from '../strategy/auth.strategy'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({}),
    JwtModule.register({}),
    PassportModule.register({}),
  ],
  providers: [AuthService, PrismaService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
