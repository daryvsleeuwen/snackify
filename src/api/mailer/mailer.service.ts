import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const nodemailer = require('nodemailer');

@Injectable()
export class MailerService {
  transporter = null;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('MAILER_HOST'),
      port: this.config.get('MAILER_PORT'),
      secure: false,
      auth: {
        user: this.config.get('MAILER_USER'),
        pass: this.config.get('MAILER_PASSWORD'),
      },
    });
  }

  async send(subject: string, recipients: string[], template: string) {
    await this.transporter.sendMail({
      from: this.config.get('MAILER_FROM'),
      bcc: recipients,
      subject: subject,
      html: template,
    });
  }
}
