import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  singup(@Body() data: UserDto) {
    return this.authService.signup(data);
  }

  @Post('signin')
  singin() {
    return this.authService.signin();
  }
}
