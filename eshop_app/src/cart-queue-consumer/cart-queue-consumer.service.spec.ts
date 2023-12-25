import { Test, TestingModule } from '@nestjs/testing';
import { CartQueueConsumerService } from './cart-queue-consumer.service';

describe('CartQueueConsumerService', () => {
  let service: CartQueueConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartQueueConsumerService],
    }).compile();

    service = module.get<CartQueueConsumerService>(CartQueueConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
