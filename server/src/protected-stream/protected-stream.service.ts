import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from 'src/prisma/prisma.service'
import { jwtPayload } from 'types/types'
import { verify } from 'jsonwebtoken'
import { TransactionObject } from 'src/dto/user.dto'
import { ValidateTransaction } from './transactionValidation.service'

@Injectable()
export class ProtectedStreamService {
  constructor(
    private prismaService: PrismaService,
    private config: ConfigService,
    private TValidation: ValidateTransaction,
  ) {}

  async personalData(id: number) {
    let data = await this.prismaService.$transaction([
      this.prismaService.wallet.findFirst({ where: { user_id: id } }),
      this.prismaService.transactions.findMany({
        where: { user_id: id },
        orderBy: {
          time: 'desc',
        },
        take: 10,
      }),
    ])
    return data
  }

  async transaction(request: TransactionObject, id: number) {
    let updateRequest: any

    try {
      if (request.side === 'BUY') {
        updateRequest = await this.TValidation.BUY(request, id)
      } else updateRequest = await this.TValidation.SELL(request, id)

      return updateRequest //last update
    } catch (error) {
      return { error: 'no enough moneee' }
    }
  }

  async handleConnection(token: string): Promise<jwtPayload | false> {
    if (!token) {
      return false
    }

    let response = this.TValidation.validateUserOnConnection(token)

    if (!response) {
      return false
    }

    return response
  }

  async addMoney(user_id: number, amount: number) {
    let res
    try {
      res = await this.prismaService
        .$queryRaw`update wallet set usdt = coalesce(usdt,0)+${amount} where user_id = ${user_id}`
      return res
    } catch (err) {
      return { error: 'transation failed' }
    }
  }
}
