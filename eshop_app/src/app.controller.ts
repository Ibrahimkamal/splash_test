import { Controller, Post, Body } from '@nestjs/common';
import { EventHubProducerService } from './event-hub-producer/event-hub-producer.service';
import { EventHubConsumerService } from './event-hub-consumer/event-hub-consumer.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventHubService: EventHubProducerService) {}

  @Post()
  async sendEvent(@Body() eventData: any) {
    await this.eventHubService.sendEvent(eventData);
    return { message: 'Event sent successfully' };
  }
}
