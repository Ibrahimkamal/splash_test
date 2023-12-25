import { Module } from '@nestjs/common';
import { EventsController } from './event-hub-producer.controller';
import { EventHubProducerService } from './event-hub-producer.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  controllers: [EventsController],
  providers: [
    EventHubProducerService,
  ],
})
export class EventHubProducerModule { }