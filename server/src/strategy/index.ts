import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { jwtPayload } from 'types/types'

interface token {
  sign(obj: jwtPayload): string
}

export class SignToken {
  constructor(private tokenClass: token) {}
  getToken(obj: jwtPayload) {
    return this.tokenClass.sign(obj)
  }
}

export class AccessTokenStrategy implements token {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
  ) {}
  public sign(obj: jwtPayload) {
    return this.jwt.sign(obj, {
      secret: this.config.get('ACC'),
      expiresIn: '2 days',
    })
  }
}

export class RefreshTokenStrategy implements token {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
  ) {}
  public sign(obj: jwtPayload) {
    return this.jwt.sign(obj, {
      secret: this.config.get('REF'),
      expiresIn: '30d',
    })
  }
}
