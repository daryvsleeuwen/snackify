import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AddOrderDto } from './dto';
import { SessionService } from './session.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get('/latest')
  getLatestSession() {
    return this.sessionService.getLatestSession();
  }

  @Post('/new')
  createSession(@Body() data: any) {
    return this.sessionService.createSession(data);
  }

  @Post('/addorder')
  addOrder(@Body() data: AddOrderDto, @Req() req: Request) {
    if (req.user) {
      return this.sessionService.addOrder(data, req.user);
    }
  }
}
