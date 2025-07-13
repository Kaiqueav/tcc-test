import { Test, TestingModule } from '@nestjs/testing';
import { HorarioIntervaloService } from './horario-intervalo.service';

describe('HorarioIntervaloService', () => {
  let service: HorarioIntervaloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorarioIntervaloService],
    }).compile();

    service = module.get<HorarioIntervaloService>(HorarioIntervaloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
