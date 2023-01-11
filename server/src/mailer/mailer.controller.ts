import { MailerService } from '@nestjs-modules/mailer/dist'
import { Controller } from '@nestjs/common'
import { Get } from '@nestjs/common/decorators'

//3.4
@Controller('mailer')
export class MailerController {
  constructor(private mailService: MailerService) {}

  @Get('test')
  async send() {
    return await this.mailService.sendMail({
      to: 'kikoger633@cmeinbox.com',
      from: 'kikoger633@cmeinbox.com',
      subject: 'test',
      text: 'test',
    })
  }
}
