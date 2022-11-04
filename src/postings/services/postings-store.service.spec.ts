import { Test, TestingModule } from '@nestjs/testing';
import { PostingsStoreService } from './postings-store.service';

describe('PostingsStoreService', () => {
  let service: PostingsStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostingsStoreService],
    }).compile();

    service = module.get<PostingsStoreService>(PostingsStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
