import { Test, TestingModule } from '@nestjs/testing';
import { HorarioTrablhoController } from './horario-trablho.controller';

describe('HorarioTrablhoController', () => {
  let controller: HorarioTrablhoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorarioTrablhoController],
    }).compile();

    controller = module.get<HorarioTrablhoController>(HorarioTrablhoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
