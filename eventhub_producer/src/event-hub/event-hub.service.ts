import { Injectable } from '@nestjs/common';
import { EventHubProducerClient } from '@azure/event-hubs';

@Injectable()
export class EventHubService {
  private producerClient: EventHubProducerClient;

  constructor() {
    const connectionString = 'Endpoint=sb://eshop-eventhub-ns.servicebus.windows.net/;SharedAccessKeyName=producer;SharedAccessKey=qln8YKLwz/McrPF2n41FZCpHyHSa3q/uc+AEhILN3Rg=;EntityPath=eshop-eventhub';
    const eventHubName = 'eshop-eventhub';

    this.producerClient = new EventHubProducerClient(connectionString, eventHubName);
  }

  async sendEvent(eventData: any): Promise<void> {
    const batch = await this.producerClient.createBatch();
    batch.tryAdd({ body: eventData });

    await this.producerClient.sendBatch(batch);
  }
}