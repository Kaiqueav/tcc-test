import { Module } from '@nestjs/common';
import { HorarioTrabalhoService } from './horario-trabalho.service';
import { HorarioTrabalhoController } from './horario-trabalho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioTrabalho } from './entities/horario-trabalho.entity';
import { FuncionariosModule } from 'src/funcionarios/funcionarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HorarioTrabalho]),
    FuncionariosModule
  ],
  providers: [HorarioTrabalhoService],
  controllers: [HorarioTrabalhoController],
  exports: [HorarioTrabalhoService] 
})
export class HorarioTrabalhoModule {}
