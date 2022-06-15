import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  singup(@Body() data: AuthDto) {
    return this.authService.signup(data);
  }

  @Post('signin')
  singin() {
    return this.authService.signin();
  }
}
