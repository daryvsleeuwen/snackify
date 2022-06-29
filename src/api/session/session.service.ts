import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer/mailer.service';
import { PrismaService } from '../prisma/prisma.service';
import { AddOrderDto } from './dto';
import mailTemplate from './session-mail-template';
@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService, private mailer: MailerService) {}

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
                  profileImage: true,
                },
              },
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

      await this.mailer.send('Snackify, plaats je bestelling', recipients, mailTemplate);

      return session;
    } catch (error) {
      throw error;
    }
  }

  async addOrder(data: AddOrderDto, user: any) {
    try {
      const latestSession = await this.getLatestSession();

      if (!latestSession) return false;

      for (let i = 0; i < latestSession.orders.length; i++) {
        const order = latestSession.orders[i];

        if (order.userId === user.id) {
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
