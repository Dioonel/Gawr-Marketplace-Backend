import { Test, TestingModule } from '@nestjs/testing';
import { CommentsStoreService } from './comments-store.service';

describe('CommentsStoreService', () => {
  let service: CommentsStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsStoreService],
    }).compile();

    service = module.get<CommentsStoreService>(CommentsStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
