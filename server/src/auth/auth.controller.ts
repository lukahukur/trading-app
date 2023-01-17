import { Controller, Post, Body, Req } from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { OKpost } from '../../types/decorators'
import { userDto } from '../dto/user.dto'
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
    @Req() req: { user: { access: string; refresh: string } },
  ) {
    return { access: req.user.access }
  }

  // @Get('verification')
  // @Redirect()
  // async verification(
  //   @Query() uuid: QueryUUIDDto,
  //   @Res() resp: FastifyReply,
  // ) {
  //   if (await this.authService.verification(uuid.uuid))
  //     resp.status(302).redirect(this.config.get('REDIRECT_URL'))
  //   return 'verified'
  // }
}
