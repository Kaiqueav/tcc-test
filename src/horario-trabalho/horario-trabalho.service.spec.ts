import { Test, TestingModule } from '@nestjs/testing';
import { HorarioTrabalhoService } from './horario-trabalho.service';

describe('HorarioTrabalhoService', () => {
  let service: HorarioTrabalhoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorarioTrabalhoService],
    }).compile();

    service = module.get<HorarioTrabalhoService>(HorarioTrabalhoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
