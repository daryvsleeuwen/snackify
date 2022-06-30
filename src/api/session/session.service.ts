import { Injectable } from '@nestjs/common';
import { isUndefined } from 'util';
import { MailerService } from '../mailer/mailer.service';
import { PrismaService } from '../prisma/prisma.service';
import { AddOrderDto } from './dto';
import mailTemplate from './session-mail-template';
@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService, private mailer: MailerService) {}

  async getLatestSession(user?: any) {
    try {
      const execption = { session: null, alreadyOrdered: false };

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

      if (session.length <= 0) return execption;

      const epoch = session[0].createdAt.getTime();
      if (epoch + 1_800_000 < Date.now()) return execption;

      let alreadyOrdered = false;

      if (user !== undefined && user !== null) {
        for (let i = 0; i < session[0].orders.length; i++) {
          const order = session[0].orders[i];

          if (order.userId === user.id) {
            alreadyOrdered = true;
          }
        }
      }

      return { session: session[0], alreadyOrdered: alreadyOrdered };
    } catch (error) {
      throw error;
    }
  }

  async createSession(selectedUsers: any[]) {
    try {
      const { session: latestSession } = await this.getLatestSession();
      if (latestSession !== null) return false;

      const newSession = await this.prisma.session.create({ data: {} });
      const recipients = selectedUsers.map((user) => user.email);

      this.mailer.send('Snackify, plaats je bestelling', recipients, mailTemplate);

      return newSession;
    } catch (error) {
      throw error;
    }
  }

  async addOrder(data: AddOrderDto, user: any) {
    try {
      const { session, alreadyOrdered } = await this.getLatestSession(user.id);

      if (!session) return false;
      if (alreadyOrdered) return false;

      const order = await this.prisma.order.create({
        data: {
          userId: user.id,
          snacks: {
            connect: data.snacks,
          },
          whiteBuns: data.whiteBuns,
          brownBuns: data.brownBuns,
          sessionId: session.id,
        },
      });

      return order;
    } catch (error) {
      throw error;
    }
  }
}
