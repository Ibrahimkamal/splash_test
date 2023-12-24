import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventHubService } from './event-hub/event-hub.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}