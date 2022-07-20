import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getGeneralStatistics(user: any) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        snacks: {
          select: {
            snack: true,
            amount: true,
          },
        },
      },
    });

    if (!orders) return null;

    const statistics = {
      mostEatenSnack: null,
      totalEatenSnacks: 0,
      totalEatenWhiteBuns: 0,
      totalEatenBrownBuns: 0,
    };

    let totalSnacks = 0;

    orders.forEach((order) => {
      statistics.totalEatenWhiteBuns += order.whiteBuns;
      statistics.totalEatenBrownBuns += order.brownBuns;

      order.snacks.forEach((snack) => {
        totalSnacks += snack.amount;
      });
    });

    const snacks = [];

    orders.forEach((order) => {
      order.snacks.forEach((snack) => {
        snacks.push(snack.snack);
      });
    });

    const mostEatenSnack = snacks
      .sort((a, b) => snacks.filter((v) => v === a).length - snacks.filter((v) => v === b).length)
      .pop();

    statistics.totalEatenSnacks = totalSnacks;
    statistics.mostEatenSnack = mostEatenSnack;
    return statistics;
  }
}
