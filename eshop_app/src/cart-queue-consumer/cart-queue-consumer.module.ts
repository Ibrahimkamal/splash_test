import { Module } from '@nestjs/common';
import { CartQueueConsumerService } from './cart-queue-consumer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { cartSchema } from './schemas/cart.schema';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Cart', schema: cartSchema }])
  ],
  controllers: [],
  providers: [
    CartQueueConsumerService,
  ],
})
export class CartQueueConsumerModule { }