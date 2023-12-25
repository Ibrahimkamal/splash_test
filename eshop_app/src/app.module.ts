import { Module } from '@nestjs/common';
import { EventsController } from './app.controller';
import { EventHubProducerService } from './event-hub-producer/event-hub-producer.service';
import { EventHubConsumerService } from './event-hub-consumer/event-hub-consumer.service';
import { CartQueueConsumerService } from './cart-queue-consumer/cart-queue-consumer.service';
import { OrderQueueConsumerService } from './order-queue-consumer/order-queue-consumer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [EventsController],
  providers: [EventHubProducerService, EventHubConsumerService, CartQueueConsumerService, OrderQueueConsumerService],
})
export class AppModule { }
