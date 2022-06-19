import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionService } from './session.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get()
  getLatestSession() {
    return this.sessionService.getLatestSession();
  }

  @Post('/new')
  createSession() {
    this.sessionService.createSession();
  }
}
