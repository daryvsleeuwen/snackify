import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signup(data: AuthDto) {
    return { message: 'Successfully signed up' };
  }

  signin() {
    return { message: 'Successfully signed in' };
  }
}
