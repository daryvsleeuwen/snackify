import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AddOrderDto } from './dto';
import mailTemplate from './session-mail-template';
const nodemailer = require('nodemailer');
@Injectable()
export class SessionService {
  transporter = null;

  constructor(private config: ConfigService, private prisma: PrismaService) {
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

  async getLatestSession() {
    try {
      const session = await this.prisma.session.findMany({
        take: -1,
        include: {
          orders: {
            include: {
              snacks: true,
              user: {
                select: {
                  profileImage: true
                }
              }
            },
          },
        },
      });

      if (session.length <= 0) return false;

      const epoch = session[0].createdAt.getTime();
      if (epoch + 1_800_000 < Date.now()) return false;

      return session[0];
    } catch (error) {
      throw error;
    }
  }

  async createSession(selectedUsers: any[]) {
    try {
      const session = await this.prisma.session.create({ data: {} });
      const recipients = selectedUsers.map((user) => user.email);

      await this.transporter.sendMail({
        from: this.config.get('MAILER_FROM'),
        bcc: recipients,
        subject: 'Snackify, plaats je bestelling',
        html: mailTemplate,
      });

      return session;
    } catch (error) {
      throw error;
    }
  }

  async addOrder(data: AddOrderDto, user: any) {
    try {
      const latestSession = await this.getLatestSession();

      if (!latestSession) return false;

      for(let i = 0; i < latestSession.orders.length; i++){
        const order = latestSession.orders[i]

        if(order.userId === user.id){
          return false;
        }
      }

      const order = await this.prisma.order.create({
        data: {
          userId: user.id,
          snacks: {
            connect: data.snacks,
          },
          whiteBuns: data.whiteBuns,
          brownBuns: data.brownBuns,
          sessionId: latestSession.id,
        },
      });

      return order;
    } catch (error) {
      throw error;
    }
  }
}
