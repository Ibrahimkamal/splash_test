import { Module } from '@nestjs/common';
import { EventsController } from './event-hub-producer/event-hub-producer.controller';
import { EventHubProducerService } from './event-hub-producer/event-hub-producer.service';
import { EventHubConsumerService } from './event-hub-consumer/event-hub-consumer.service';
import { CartQueueConsumerService } from './cart-queue-consumer/cart-queue-consumer.service';
import { OrderQueueConsumerService } from './order-queue-consumer/order-queue-consumer.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot(),
],
  controllers: [EventsController],
  providers: [EventHubProducerService, EventHubConsumerService, CartQueueConsumerService, OrderQueueConsumerService],
})
export class AppModule { }
// MongooseModule.forRoot('mongodb://rootuser:rootpass@mongodb:27017/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })