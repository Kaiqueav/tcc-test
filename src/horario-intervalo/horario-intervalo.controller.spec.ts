import { Test, TestingModule } from '@nestjs/testing';
import { HorarioIntervaloController } from './horario-intervalo.controller';

describe('HorarioIntervaloController', () => {
  let controller: HorarioIntervaloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorarioIntervaloController],
    }).compile();

    controller = module.get<HorarioIntervaloController>(HorarioIntervaloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
