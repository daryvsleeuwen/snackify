import { Injectable, OnModuleInit } from '@nestjs/common';
import next from 'next';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: any;

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({ dev: true, dir: './src/client' });
      await this.server.prepare();
    } catch (error) {}
  }

  getNextServer(): any {
    return this.server;
  }
}
