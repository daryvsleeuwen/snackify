import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { PrismaModule } from './api/prisma/prisma.module';
import { UserModule } from './api/user/user.module';
import { SnackModule } from './api/snack/snack.module';
import { SessionModule } from './api/session/session.module';
import { ViewModule } from './api/view/view.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UserModule,
    SnackModule,
    SessionModule,
    ViewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
