import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventHubConsumerClient } from '@azure/event-hubs';
import { ServiceBusClient } from '@azure/service-bus';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventHubConsumerService implements OnModuleInit {
    private consumerClient: EventHubConsumerClient;

    constructor(private configService: ConfigService) {
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
                    if (event.body.eventType === "CartEvent") {
                        let queue = this.configService.get<string>('CART_QUEUE_NAME')
                        this.postMessageToQueue(event.body, queue);

                    } else if (event.body.eventType === "OrderEvent") {
                        let queue = this.configService.get<string>('ORDER_QUEUE_NAME')
                        this.postMessageToQueue(event.body, queue);
                    } else {
                        console.log("Unknown event type");
                    }
                }
            },

            processError: async (err, context) => {
                console.error(`Error : ${err}`);
            }
        });
    }
    async postMessageToQueue(message: string, queueName: string) {
        const connectionString = this.configService.get<string>('SERVICE_BUS_CONNECTION_STRING');

        const serviceBusClient = new ServiceBusClient(connectionString);
        const sender = serviceBusClient.createSender(queueName);

        try {
            const serviceBusMessage = {
                body: JSON.stringify(message),
                contentType: "application/json"
              };            
              await sender.sendMessages(serviceBusMessage);
            console.log("Message sent successfully!");
        } catch (error) {
            console.error("An error occurred while sending the message:", error);
        } finally {
            await sender.close();
            await serviceBusClient.close();
        }
    }

}
