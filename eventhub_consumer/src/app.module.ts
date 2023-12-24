import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventHubService } from './event-hub/event-hub.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, EventHubService],
})
export class AppModule { }
