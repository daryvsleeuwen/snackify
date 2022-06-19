import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, UserDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  singup(@Body() data: UserDto) {
    return this.authService.signup(data);
  }

  @Post('signin')
  singin(@Body() data: SignInDto) {
    return this.authService.signin(data);
  }
}
