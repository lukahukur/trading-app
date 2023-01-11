import { Module } from '@nestjs/common'
import { MailerService } from './mailer.service'
import { MailerController } from './mailer.controller'
import { MailerModule } from '@nestjs-modules/mailer'

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.sendgrid.net',

        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
  ],
  providers: [MailerService],
  controllers: [MailerController],
})
export class MailModule {}
