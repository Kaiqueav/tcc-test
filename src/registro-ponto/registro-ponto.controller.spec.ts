import { Test, TestingModule } from '@nestjs/testing';
import { RegistroPontoController } from './registro-ponto.controller';

describe('RegistroPontoController', () => {
  let controller: RegistroPontoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistroPontoController],
    }).compile();

    controller = module.get<RegistroPontoController>(RegistroPontoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
