import { Test, TestingModule } from '@nestjs/testing';
import { BancoHorasService } from './banco-horas.service';

describe('BancoHorasService', () => {
  let service: BancoHorasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BancoHorasService],
    }).compile();

    service = module.get<BancoHorasService>(BancoHorasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
