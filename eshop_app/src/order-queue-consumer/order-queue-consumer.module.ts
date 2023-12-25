import { Module } from '@nestjs/common';
import { OrderQueueConsumerService } from './order-queue-consumer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { orderSchema } from './schemas/order.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Order', schema: orderSchema }])
  ],
  controllers: [],
  providers: [
    OrderQueueConsumerService,
  ],
})
export class OrderQueueConsumerModule { }