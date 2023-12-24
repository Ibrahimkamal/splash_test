import { Module } from '@nestjs/common';
import { EventsController } from './app.controller';
import { EventHubService } from './event-hub/event-hub.service';

@Module({
  imports: [],
  controllers: [EventsController],
  providers: [EventHubService],
})
export class AppModule { }
