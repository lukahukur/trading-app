import { Controller, Get, Res, UseGuards } from '@nestjs/common'
import { HttpCode } from '@nestjs/common/decorators'
import { AuthGuard } from '@nestjs/passport'
import { FastifyReply } from 'fastify'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello(@Res() res: FastifyReply) {
    return res.status(200).send('OK')
  }
}
