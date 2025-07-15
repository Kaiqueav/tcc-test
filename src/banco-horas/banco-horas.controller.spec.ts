import { Test, TestingModule } from '@nestjs/testing';
import { BancoHorasController } from './banco-horas.controller';

describe('BancoHorasController', () => {
  let controller: BancoHorasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BancoHorasController],
    }).compile();

    controller = module.get<BancoHorasController>(BancoHorasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
