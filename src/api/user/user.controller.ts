import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

    @Get('')
  async getUser(@Req() req: Request) {
    return req.user;
  }

  @Get('/all')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}