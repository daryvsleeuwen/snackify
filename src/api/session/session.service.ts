import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async getLatestSession() {
    try {
      const session = await this.prisma.session.findMany({ take: -1 });
      return session;
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
}
