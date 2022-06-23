import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenDto, SignInDto, UserDto } from './dto';

@Controller('api/auth')
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

  @Post('isAuth')
  isAuthenticated(@Body() data: AccessTokenDto) {
    return this.authService.verifyToken(data.accessToken);
  }
}
