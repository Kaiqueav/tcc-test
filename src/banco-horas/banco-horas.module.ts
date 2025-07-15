import { Module } from '@nestjs/common';
import { BancoHorasController } from './banco-horas.controller';
import { BancoHorasService } from './banco-horas.service';

@Module({
  controllers: [BancoHorasController],
  providers: [BancoHorasService]
})
export class BancoHorasModule {}
