import { Controller, Post, Body } from '@nestjs/common';
import { EventHubService } from './event-hub/event-hub.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventHubService: EventHubService) {}

  @Post()
  async sendEvent(@Body() eventData: any) {
    await this.eventHubService.sendEvent(eventData);
    return { message: 'Event sent successfully' };
  }
}
