import { Module } from '@nestjs/common';
import { HorarioTrabalhoService } from './horario-trabalho.service';
import { HorarioTrabalhoController } from './horario-trabalho.controller';

@Module({
  providers: [HorarioTrabalhoService],
  controllers: [HorarioTrabalhoController]
})
export class HorarioTrabalhoModule {}
