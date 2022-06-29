import { Module } from '@nestjs/common';
import { MailerService } from '../mailer/mailer.service';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  controllers: [SessionController],
  providers: [SessionService, MailerService],
})
export class SessionModule {}
