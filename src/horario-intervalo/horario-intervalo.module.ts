import { Module } from '@nestjs/common';
import { HorarioIntervaloController } from './horario-intervalo.controller';
import { HorarioIntervaloService } from './horario-intervalo.service';

@Module({
  controllers: [HorarioIntervaloController],
  providers: [HorarioIntervaloService]
})
export class HorarioIntervaloModule {}
