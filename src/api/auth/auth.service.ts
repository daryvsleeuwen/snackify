import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(data: UserDto) {
    const hash = await argon.hash(data.password);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
        profileImage: data.profileImage,
      },
    });

    delete user.password;

    return user;
  }

  signin() {
    return { message: 'Successfully signed in' };
  }
}
