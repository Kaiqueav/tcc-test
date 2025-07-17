import { Module } from '@nestjs/common';
import { RelatoriosController } from './relatorios.controller';
import { RelatoriosService } from './relatorios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relatorio } from 'src/relatorios/entities/relatorio.entity';
import { FuncionariosModule } from 'src/funcionarios/funcionarios.module';
import { RegistroPontoModule } from 'src/registro-ponto/registro-ponto.module';
import { BancoHorasModule } from 'src/banco-horas/banco-horas.module';

@Module({
    imports: [
    TypeOrmModule.forFeature([Relatorio]),
    FuncionariosModule,
    RegistroPontoModule,
    BancoHorasModule,
  ],
  controllers: [RelatoriosController],
  providers: [RelatoriosService]
})
export class RelatoriosModule {}
