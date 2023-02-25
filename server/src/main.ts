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

  let PORT = process.env.PORT || 8080

  await app.listen(PORT, '0.0.0.0')

  console.log('app is running on port ' + PORT)
}

bootstrap()

console.log(process.env.REDIRECT_URL_MAIN)
