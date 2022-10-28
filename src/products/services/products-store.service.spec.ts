import { Test, TestingModule } from '@nestjs/testing';
import { ProductsStoreService } from './products-store.service';

describe('ProductsStoreService', () => {
  let service: ProductsStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsStoreService],
    }).compile();

    service = module.get<ProductsStoreService>(ProductsStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
