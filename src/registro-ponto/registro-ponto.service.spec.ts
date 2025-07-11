import { Test, TestingModule } from '@nestjs/testing';
import { RegistroPontoService } from './registro-ponto.service';

describe('RegistroPontoService', () => {
  let service: RegistroPontoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroPontoService],
    }).compile();

    service = module.get<RegistroPontoService>(RegistroPontoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
