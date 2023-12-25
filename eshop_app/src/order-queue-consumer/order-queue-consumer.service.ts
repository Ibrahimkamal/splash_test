import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServiceBusClient } from '@azure/service-bus';

@Injectable()
export class OrderQueueConsumerService {
    private client: ServiceBusClient;
    private receiver: any; // Specify the correct type

    constructor(private configService: ConfigService) {
        const connectionString = this.configService.get<string>('SERVICE_BUS_CONNECTION_STRING');
        this.client = new ServiceBusClient(connectionString);
        this.initializeReceiver();
    }

    private async initializeReceiver() {
        const queueName = this.configService.get<string>('ORDER_QUEUE_NAME');
        this.receiver = this.client.createReceiver(queueName);
        this.startListening();
    }

    private async startListening() {
        this.receiver.subscribe({
            processMessage: async (message) => {
                console.log(`Received message: ${message.body}`);
                // Process message
            },
            processError: async (error) => {
                console.error(`Error on message processing: ${error}`);
            },
        });
    }
}
