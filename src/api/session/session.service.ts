import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddOrderDto } from './dto';
import mailTemplate from './session-mail-template';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.strato.com',
  port: 587,
  secure: false,
  auth: {
    user: 'contact@daryvansleeuwen.nl',
    pass: 'Kerstman1!',
  },
});

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async getLatestSession() {
    try {
      const session = await this.prisma.session.findMany({
        take: -1,
        include: {
          orders: {
            include: {
              snacks: true,
              user: true,
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

      await transporter.sendMail({
        from: 'contact@daryvansleeuwen.nl',
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
