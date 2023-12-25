import { Module } from '@nestjs/common';
import { EventHubConsumerService } from './event-hub-consumer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [
    EventHubConsumerService,
  ],
})
export class EventHubConsumerModule { }