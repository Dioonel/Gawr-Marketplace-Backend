import { Test, TestingModule } from '@nestjs/testing';
import { UsersStoreService } from './users-store.service';

describe('UsersStoreService', () => {
  let service: UsersStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersStoreService],
    }).compile();

    service = module.get<UsersStoreService>(UsersStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
