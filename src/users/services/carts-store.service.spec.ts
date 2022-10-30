import { Test, TestingModule } from '@nestjs/testing';
import { CartsStoreService } from './carts-store.service';

describe('CartsStoreService', () => {
  let service: CartsStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartsStoreService],
    }).compile();

    service = module.get<CartsStoreService>(CartsStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
