import { Module } from '@nestjs/common'
import { Global } from '@nestjs/common/decorators'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma.service'

@Global()
@Module({
  imports: [ConfigModule.forRoot({})],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
