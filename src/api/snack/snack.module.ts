import { Module } from '@nestjs/common';
import { SnackController } from './snack.controller';
import { SnackService } from './snack.service';

@Module({
  controllers: [SnackController],
  providers: [SnackService],
})
export class SnackModule {}
