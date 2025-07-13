import { Test, TestingModule } from '@nestjs/testing';
import { HorarioTrabalhoController } from './horario-trabalho.controller';

describe('HorarioTrabalhoController', () => {
  let controller: HorarioTrabalhoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorarioTrabalhoController],
    }).compile();

    controller = module.get<HorarioTrabalhoController>(HorarioTrabalhoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
