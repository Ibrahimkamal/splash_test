import { Test, TestingModule } from '@nestjs/testing';
import { OrderQueueConsumerService } from './order-queue-consumer.service';

describe('CartQueueConsumerService', () => {
  let service: OrderQueueConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderQueueConsumerService],
    }).compile();

    service = module.get<OrderQueueConsumerService>(OrderQueueConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
