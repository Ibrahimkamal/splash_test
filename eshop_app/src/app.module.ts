import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderQueueConsumerModule } from './order-queue-consumer/order-queue-consumer.module';
import { CartQueueConsumerModule } from './cart-queue-consumer/cart-queue-consumer.module';
import { EventHubConsumerModule } from './event-hub-consumer/event-hub-consumer.module';
import { EventHubProducerModule } from './event-hub-producer/event-hub-producer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}`),
    MongooseModule.forRoot(`mongodb://admin:admin@localhost:27027/eshop_db`),
    OrderQueueConsumerModule,
    CartQueueConsumerModule,
    EventHubConsumerModule,
    EventHubProducerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }