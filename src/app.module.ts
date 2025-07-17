import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FuncionariosController } from './funcionarios/funcionarios.controller';
import { FuncionariosService } from './funcionarios/funcionarios.service';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroPontoModule } from './registro-ponto/registro-ponto.module';
import { HorarioIntervaloModule } from './horario-intervalo/horario-intervalo.module';
import { HorarioTrabalhoModule } from './horario-trabalho/horario-trabalho.module';
import { BancoHorasModule } from './banco-horas/banco-horas.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { HorarioTrabalhoController } from './horario-trabalho/horario-trabalho.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port:3306,
      username:'myuser',
      password: 'mypassword',
      database: 'controle_ponto',
      autoLoadEntities: true,
      synchronize: true
    }),
    FuncionariosModule,
    RegistroPontoModule,
    HorarioIntervaloModule,
    HorarioTrabalhoModule,
    BancoHorasModule,
    RelatoriosModule
  ],
  controllers: [AppController, FuncionariosController, HorarioTrabalhoController],
  providers: [AppService, FuncionariosService],
})
export class AppModule {}
