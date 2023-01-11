import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { MailModule } from './mailer/mailer.module'
import { StreamModule } from './stream/stream.module'
import { ProtectedStream } from './protected-stream/protected.module'

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({}),
    MailModule,
    StreamModule,
    ProtectedStream,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
