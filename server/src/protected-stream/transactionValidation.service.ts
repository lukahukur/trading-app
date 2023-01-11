import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator'
import { ConfigService } from '@nestjs/config'
import { verify } from 'jsonwebtoken'
import {
  KlineResponseAdapter,
  TransactionObject,
} from 'src/dto/user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { jwtPayload } from 'types/types'

@Injectable()
export class ValidateTransaction {
  constructor(
    private prismaService: PrismaService,
    private config: ConfigService,
  ) {}

  async BUY(request: TransactionObject, user_id: number) {
    console.log(request)
    const coin = request.coin
    return await this.prismaService.$transaction([
      this.prismaService.$queryRawUnsafe(
        'update wallet set ' +
          coin +
          '= coalesce(' +
          coin +
          ',0)+$1 where user_id = $2', // I know, It may look unsafe but coin goes through validation before it is passed here
        request.amount,
        user_id,
      ),
      this.prismaService
        .$queryRaw`UPDATE wallet SET usdt = COALESCE(usdt,0)-${
        request.amount * request.price
      } where user_id = ${user_id}`,
      // this.updateHistory(request, user_id),
    ])
  }

  async SELL(request: TransactionObject, user_id: number) {
    let coin = request.coin

    return await this.prismaService.$transaction([
      this.prismaService
        .$queryRaw`update wallet set usdt = coalesce(usdt,0)+${
        request.amount * request.price
      } where user_id = ${user_id}`,

      this.prismaService.$queryRawUnsafe(
        'update wallet set ' +
          coin +
          '= coalesce(' +
          coin +
          ',0)-$1 where user_id = $2', // I know, It may look unsafe but coin goes through validation before it is passed here
        request.amount,
        user_id,
      ),
      this.updateHistory(request, user_id),
    ])
  }

  updateHistory(request: TransactionObject, user_id: number) {
    return this.prismaService.transactions.create({
      data: {
        amount: request.amount,
        user_id: user_id,
        side: request.side,
        time: new Date().getTime(),
        currency: request.coin + 'usdt',
        price: request.price,
      },
    })
  }

  validateUserOnConnection(token: string): jwtPayload | false {
    try {
      return verify(token, this.config.get('ACC')) as jwtPayload
    } catch (err) {
      return false
    }
  }
}
