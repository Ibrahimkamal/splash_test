import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServiceBusClient } from '@azure/service-bus';
import { Cart } from './interfaces/cart.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CartQueueConsumerService {
    private client: ServiceBusClient;
    private receiver: any; // Specify the correct type

    constructor(private configService: ConfigService, @InjectModel('Cart') private readonly cartModel: Model<Cart>) {
        const connectionString = this.configService.get<string>('SERVICE_BUS_CONNECTION_STRING');
        this.client = new ServiceBusClient(connectionString);
        this.initializeReceiver();
    }

    private async initializeReceiver() {
        const queueName = this.configService.get<string>('CART_QUEUE_NAME');
        this.receiver = this.client.createReceiver(queueName);
        this.startListening();
    }

    private async startListening() {
        this.receiver.subscribe({
            processMessage: async (message: any) => {
                console.log(`Received message: ${message.body}`);
                try {
                    await this.createCart(JSON.parse(message.body).details);
                    await message.complete();
                } catch (error) {
                    console.error(`Error while processing order: ${error}`);
                }
            },
        });
    }
    async createCart(cart: Cart): Promise<Cart> {
        try {
            const newOrder = new this.cartModel(cart);
            const savedOrder = await newOrder.save();

            const fetchedOrder = await this.findOrderById(savedOrder.id);
            console.log("Fetched order:", fetchedOrder);

            return savedOrder;
        } catch (error) {
            console.error(`Error while saving order: ${error}`);
            throw error;
        }
    }
    async findOrderById(id: string): Promise<Cart> {
        return await this.cartModel.findById(id);
    }
}
