import { Module } from '@nestjs/common';
import { HorarioIntervaloController } from './horario-intervalo.controller';
import { HorarioIntervaloService } from './horario-intervalo.service';
import { FuncionariosModule } from 'src/funcionarios/funcionarios.module';
import { HorarioIntervalo } from './entities/horario-intervalo-entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([HorarioIntervalo]), // Adicione esta linha
    FuncionariosModule // Adicione esta linha
  ],
  controllers: [HorarioIntervaloController],
  providers: [HorarioIntervaloService]
})
export class HorarioIntervaloModule {}
