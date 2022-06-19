import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { SnackDto } from './dto';

@Injectable()
export class SnackService {
  constructor(private prisma: PrismaService) {}

  async addNewSnack(data: SnackDto) {
    try {
      const snack = await this.prisma.snack.create({
        data: {
          name: data.name,
          image: data.image,
        },
      });

      return snack;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Snack already exists');
        }
      }
    }
  }

  getAllSnacks() {
    return this.prisma.snack.findMany();
  }
}
