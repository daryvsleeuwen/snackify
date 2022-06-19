import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SnackDto } from './dto';
import { SnackService } from './snack.service';

@UseGuards(AuthGuard('jwt'))
@Controller('snack')
export class SnackController {
  constructor(private snackService: SnackService) {}

  @Post('/new')
  async addNewSnack(@Body() data: SnackDto) {
    console.log(data);
    return this.snackService.addNewSnack(data);
  }

  @Get('/all')
  async getAllSnacks() {
    return this.snackService.getAllSnacks();
  }
}
