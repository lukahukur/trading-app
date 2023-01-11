import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common'
import {
  Get,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common/decorators'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { FastifyReply } from 'fastify'
import { OKpost, Redirect } from '../../types/decorators'
import { QueryUUIDDto, userDto } from '../dto/user.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    public authService: AuthService,
    public config: ConfigService,
  ) {}

  @Post('signup')
  @OKpost()
  signup(@Body() dto: userDto) {
    return this.authService.signup(dto)
  }
  @Post('signin')
  @OKpost()
  @UseGuards(AuthGuard('local'))
  async singin(
    @Res({ passthrough: true }) res: FastifyReply,
    @Req() req: { user: { access: string; refresh: string } },
  ) {
    res
      .setCookie('Authorization', req.user.access, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      })
      .setCookie('refresh', req.user.refresh, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',
        httpOnly: true,
        path: '/',
      })

    return { message: 'set-cookie' }
  }

  @Get('verification')
  @Redirect()
  async verification(
    @Query() uuid: QueryUUIDDto,
    @Res() resp: FastifyReply,
  ) {
    if (await this.authService.verification(uuid.uuid))
      resp.status(302).redirect(this.config.get('REDIRECT_URL'))
    return 'verified'
  }

  @Post('authOnLoad')
  @OKpost()
  @UseGuards(AuthGuard('jwt'))
  async auth() {
    return this.authService.auth()
  }

  @Post('logout')
  @OKpost()
  async logout(@Res() resp: FastifyReply) {
    resp
      .clearCookie('Authorization', {
        path: '/',
      })
      .clearCookie('refresh', {
        path: '/',
      })
      .redirect('http://localhost:3000')
    return 'oke'
  }
}
