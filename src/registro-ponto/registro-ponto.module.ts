import { Module } from '@nestjs/common';
import { RegistroPontoController } from './registro-ponto.controller';
import { RegistroPontoService } from './registro-ponto.service';

@Module({
  controllers: [RegistroPontoController],
  providers: [RegistroPontoService]
})
export class RegistroPontoModule {}
