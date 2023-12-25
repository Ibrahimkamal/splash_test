import { Injectable } from '@nestjs/common';
import { EventHubProducerClient } from '@azure/event-hubs';
import { ConfigService } from "@nestjs/config";
@Injectable()
export class EventHubProducerService {
  private producerClient: EventHubProducerClient;

  constructor(configService: ConfigService) {
    const connectionString = configService.get<string>('EVENT_HUB_CONNECTION_STRING_PRODUCER');
    const eventHubName = configService.get<string>('EVENT_HUB_NAME');

    this.producerClient = new EventHubProducerClient(connectionString, eventHubName);
  }

  async sendEvent(eventData: any): Promise<void> {
    const batch = await this.producerClient.createBatch();
    batch.tryAdd({ body: eventData });

    await this.producerClient.sendBatch(batch);
  }
}