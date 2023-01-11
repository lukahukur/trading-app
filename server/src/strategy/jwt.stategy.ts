import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'jsonwebtoken'
import { Socket } from 'socket.io'
import { Stream } from '../../types/types'
import { parse } from 'cookie'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(public config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('access'),
      ignoreExpiration: false,
      secretOrKey: config.get('ACC'),
    })
  }
  validate(payload: any) {
    return payload
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(public config: ConfigService) {}

  async canActivate(context: ExecutionContext) {
    let client: Socket = context.switchToWs().getClient()
    try {
      const accessToken = parse(client.handshake.headers.cookie)[
        'Authorization'
      ]

      const decoded = verify(accessToken, this.config.get('ACC'))

      context.switchToWs().getClient().user = decoded

      return true
    } catch (err) {
      client.emit(Stream.Error, 'invalid token')

      client.disconnect(true)

      return false
    }
  }
}
