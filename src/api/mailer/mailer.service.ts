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
      requireTLS: true,
      auth: {
        user: this.config.get('MAILER_USER'),
        pass: this.config.get('MAILER_PASSWORD'),
      },
      from: this.config.get('MAILER_USER'),
    });
  }

  async send(subject: string, to: string, template: string) {
    await this.transporter.sendMail({
      from: `Snackify <${this.config.get('MAILER_USER')}>`,
      to: to,
      subject: subject,
      text: subject,
      html: template,
    });
  }
}
