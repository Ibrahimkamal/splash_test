import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventHubConsumerClient } from '@azure/event-hubs';

@Injectable()
export class EventHubService implements OnModuleInit {
    private consumerClient: EventHubConsumerClient;

    constructor() {
        const connectionString = "Endpoint=sb://eshop-eventhub-ns.servicebus.windows.net/;SharedAccessKeyName=consumer;SharedAccessKey=WuZZT0rRdx2I8SkEHWuAPrxLDnCfwZpD4+AEhGEjVkY=;EntityPath=eshop-eventhub";
        const eventHubName = "eshop-eventhub"
        const consumerGroup = '$Default';

        this.consumerClient = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName);
    }

    async onModuleInit() {
        this.consumerClient.subscribe({
            processEvents: async (events, context) => {
                for (const event of events) {
                    console.log(`Received event: ${JSON.stringify(event.body)}`);
                }
            },
            processError: async (err, context) => {
                console.error(`Error : ${err}`);
            }
        });
    }
}
