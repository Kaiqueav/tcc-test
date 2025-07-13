import { Module } from '@nestjs/common';
import { HorarioTrabalhoService } from './horario-trabalho.service';

@Module({
  providers: [HorarioTrabalhoService]
})
export class HorarioTrabalhoModule {}
