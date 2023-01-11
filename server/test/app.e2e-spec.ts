import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from './../src/app.module'
import * as pactum from 'pactum'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import fastifyCookie from '@fastify/cookie'
import { PrismaService } from '../src/prisma/prisma.service'

describe('e2e', () => {
  let app: NestFastifyApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    )

    app.useGlobalPipes(new ValidationPipe())
    app.register(fastifyCookie, {}) // register the middleware
    await app.init()
    await app.getHttpAdapter().getInstance().ready()

    await app.listen(3333)

    prisma = app.get(PrismaService)
    await prisma.cleanDB()

    pactum.request.setBaseUrl('http://localhost:3333')
  })

  afterAll(async () => {
    await app.close()
  })

  describe('login testing', () => {
    it('should pass authorization', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: 'test@gmail.com',
          password: 'testPass',
        })
        .expectStatus(201)
    })
    it('should fail authorization', () => {
      return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: 'test@mail.com',
          password: 'testPass',
        })
        .expectStatus(403)
    })
    describe('missing credentials', () => {
      it('should throw 400', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: '',
            password: 'testPass',
          })
          .expectStatus(401)
      })

      it('should throw 400', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: '',
            password: '',
          })
          .expectStatus(401)
      })

      it('should throw 400', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: 'asdfasdf',
            password: '',
          })
          .expectStatus(401)
      })
    })
  })

  describe('verification tests', () => {
    it('should return 404', () => {
      return pactum
        .spec()
        .get(
          '/auth/verification?uuid=3a8a69a4-481c-494d-90ef-84977771df99',
        )
        .expectStatus(302)
    })
  })
})
