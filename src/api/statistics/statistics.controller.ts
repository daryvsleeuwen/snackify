import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StatisticsService } from './statistics.service';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('api/statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get('/general')
  getGeneralStatistics(@Req() req: Request) {
    if (req.user) {
      return this.statisticsService.getGeneralStatistics(req.user);
    }
  }
}
