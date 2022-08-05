import { Test, TestingModule } from '@nestjs/testing';
import { DivisionsService } from './divisions.service';

describe('DivisionsService', () => {
  let service: DivisionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DivisionsService],
    }).compile();

    service = module.get<DivisionsService>(DivisionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
