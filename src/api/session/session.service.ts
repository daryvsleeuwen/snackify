import { Injectable } from '@nestjs/common';
import { MailerService } from '../mailer/mailer.service';
import { PrismaService } from '../prisma/prisma.service';
import { AddOrderDto } from './dto';
import mailTemplate from './session-mail-template';
@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService, private mailer: MailerService) {}

  async getLatestSession(user?: any) {
    try {
      const session = await this.prisma.session.findMany({
        take: -1,
        include: {
          orders: {
            include: {
              snacks: {
                select: {
                  snack: true,
                  amount: true,
                },
              },
              user: {
                select: {
                  profileImage: true,
                },
              },
            },
          },
        },
      });

      const sessionData = { session: null, alreadyOrdered: false, expired: false, epoch: null };

      if (session.length <= 0) {
        return sessionData;
      } else {
        sessionData.session = session[0];
      }

      const epoch = session[0].createdAt.getTime();
      if (epoch + 1_800_000 < Date.now()) sessionData.expired = true;

      sessionData.epoch = epoch;

      if (user !== undefined && user !== null) {
        for (let i = 0; i < session[0].orders.length; i++) {
          const order = session[0].orders[i];

          if (order.userId === user.id) {
            sessionData.alreadyOrdered = true;
            break;
          }
        }
      }

      session[0].orders.forEach((order, index) => {
        const snackArray = [];

        order.snacks.forEach((snackObject) => {
          snackArray.push({ ...snackObject.snack, amount: snackObject.amount });
        });

        session[0].orders[index].snacks = snackArray;
      });

      return sessionData;
    } catch (error) {
      throw error;
    }
  }

  async createSession(selectedUsers: any[]) {
    try {
      const { session: latestSession, expired } = await this.getLatestSession();
      if (latestSession !== null && !expired) return false;

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
      const { session, alreadyOrdered, expired } = await this.getLatestSession(user.id);

      if (expired) return { error: 'De sessie is helaas al verlopen' };
      if (alreadyOrdered) return false;

      const snacks = data.snacks.map((snack) => {
        return { snackId: snack.id, amount: snack.amount };
      });

      const order = await this.prisma.order.create({
        data: {
          userId: user.id,
          snacks: {
            create: snacks,
          },
          whiteBuns: data.whiteBuns,
          brownBuns: data.brownBuns,
          sessionId: session.id,
        },
      });
      console.log(order);

      return order;
    } catch (error) {
      throw error;
    }
  }
}
