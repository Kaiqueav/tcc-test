import { Module } from '@nestjs/common';
import { BancoHorasController } from './banco-horas.controller';
import { BancoHorasService } from './banco-horas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BancoHoras } from './entities/banco-horas.entity';
import { FuncionariosModule } from 'src/funcionarios/funcionarios.module';
import { RegistroPontoModule } from 'src/registro-ponto/registro-ponto.module';
import { HorarioTrabalhoModule } from 'src/horario-trabalho/horario-trabalho.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BancoHoras]),
    FuncionariosModule,
    RegistroPontoModule,
    HorarioTrabalhoModule,
        
  ],
  controllers: [BancoHorasController],
  providers: [BancoHorasService],
  exports: [BancoHorasService]
})
export class BancoHorasModule {}
