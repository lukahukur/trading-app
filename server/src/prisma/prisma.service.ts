import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(public config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    })
  }
  //for testing, not for production fortunately
  cleanDB() {
    return this.$transaction([
      this.user_table.deleteMany({
        where: {
          NOT: {
            email: {
              equals: 'test@gmail.com',
            },
          },
        },
      }),
      this.user_table.update({
        where: {
          email: 'test@gmail.com',
        },
        data: {
          verified: false,
        },
      }),
    ])
  }
}
