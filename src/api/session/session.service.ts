import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddOrderDto } from './dto';

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
            },
          },
        },
      });

      const epoch = session[0].createdAt.getTime();
      if (epoch + 1_800_000 < Date.now()) return false;

      return session[0];
    } catch (error) {
      throw error;
    }
  }

  async createSession() {
    try {
      const session = await this.prisma.session.create({ data: {} });
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

      return true;
    } catch (error) {
      throw error;
    }
  }
}
