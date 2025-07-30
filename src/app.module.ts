 import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { RegistroPontoModule } from './registro-ponto/registro-ponto.module';
import { HorarioIntervaloModule } from './horario-intervalo/horario-intervalo.module';
import { HorarioTrabalhoModule } from './horario-trabalho/horario-trabalho.module';
import { BancoHorasModule } from './banco-horas/banco-horas.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
   
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3306,
      username: 'myuser',
      password: 'minhapassword',
      database: 'controle_ponto',
      autoLoadEntities: true,
      synchronize: true,    
    }),
    
    FuncionariosModule,
    RegistroPontoModule,
    HorarioIntervaloModule,
    HorarioTrabalhoModule,
    BancoHorasModule,
    RelatoriosModule,
    AuthModule,
    AdminModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}