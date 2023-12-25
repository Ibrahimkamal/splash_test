import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServiceBusClient } from '@azure/service-bus';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrderQueueConsumerService {
    private client: ServiceBusClient;
    private receiver: any;
    constructor(private configService: ConfigService, @InjectModel('Order') private readonly orderModel: Model<Order>) {
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
            processMessage: async (message: any) => {
                console.log(`Received message: ${message.body}`);
                try {
                    await this.createOrder(JSON.parse(message.body).details);
                    await message.complete();
                } catch (error) {
                    console.error(`Error while processing order: ${error}`);
                }
            },
        });
    }
    async createOrder(order: Order): Promise<Order> {
        try {
            const newOrder = new this.orderModel(order);
            const savedOrder = await newOrder.save();

            const fetchedOrder = await this.findOrderById(savedOrder.id);
            console.log("Fetched order:", fetchedOrder);

            return savedOrder;
        } catch (error) {
            console.error(`Error while saving order: ${error}`);
            throw error;
        }
    }
    async findOrderById(id: string): Promise<Order> {
        return await this.orderModel.findById(id);
    }
}
