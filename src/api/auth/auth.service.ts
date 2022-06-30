import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private config: ConfigService) {}

  async signup(data: UserDto) {
    const hash = await argon.hash(data.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hash,
          profileImage: data.profileImage,
        },
      });

      return this.signToken(user.id, user.email, user.name, user.role);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email is already taken');
        }
      }
    }
  }

  async signin(data: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const passwordMatches = await argon.verify(user.password, data.password);

    if (!passwordMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email, user.name, user.role);
  }

  async signToken(userId: number, email: string, name: string, role: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      name,
      role,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }

  async isAuth(accessToken: string) {
    const verified = await this.verifyToken(accessToken);

    const user = await this.prisma.user.findUnique({
      where: { id: verified.sub },
    });

    if (user !== null) {
      delete user.password;
      return user;
    }

    return false;
  }

  async verifyToken(accessToken: string) {
    try {
      const user = await this.jwtService.verify(accessToken, { secret: this.config.get('JWT_SECRET') });

      if (user) {
        return user;
      }
    } catch (error) {
      return false;
    }
  }
}
