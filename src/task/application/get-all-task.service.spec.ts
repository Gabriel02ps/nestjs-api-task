import { Test, TestingModule } from '@nestjs/testing';
import { GetAllTaskService } from './get-all-task.service';

describe('GetAllTaskService', () => {
  let service: GetAllTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllTaskService],
    }).compile();

    service = module.get<GetAllTaskService>(GetAllTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
