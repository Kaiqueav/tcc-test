import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FuncionariosController } from './funcionarios/funcionarios.controller';
import { FuncionariosService } from './funcionarios/funcionarios.service';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroPontoModule } from './registro-ponto/registro-ponto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port:3306,
      username:'myuser',
      password: 'mypassword',
      autoLoadEntities: true,
      synchronize: true
    }),
    FuncionariosModule,
    RegistroPontoModule
  ],
  controllers: [AppController, FuncionariosController],
  providers: [AppService, FuncionariosService],
})
export class AppModule {}
