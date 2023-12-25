import { Test, TestingModule } from '@nestjs/testing';
import { EventHubProducerService } from './event-hub-producer.service';

describe('EventHubProducerService', () => {
  let service: EventHubProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventHubProducerService],
    }).compile();

    service = module.get<EventHubProducerService>(EventHubProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
