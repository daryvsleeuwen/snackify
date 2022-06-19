import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionService } from './session.service';

@UseGuards(AuthGuard('jwt'))
@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Post('/new')
  createSession() {
    this.sessionService.createSession();
  }
}
