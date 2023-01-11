import { fastifyCookie } from '@fastify/cookie'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'

dotenv.config({
  path: '../',
})

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: {
        credentials: true,
        origin: process.env.REDIRECT_URL_MAIN,
      },
    },
  )

  app.useGlobalPipes(new ValidationPipe())

  await app.register(fastifyCookie, {
    secret: process.env.ACC,
  })

  await app.listen(5000)
}

bootstrap()
