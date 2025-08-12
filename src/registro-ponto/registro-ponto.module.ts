import { Module } from '@nestjs/common';
import { RegistroPontoController } from './registro-ponto.controller';
import { RegistroPontoService } from './registro-ponto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroPonto } from './entities/registro-ponto-entity';
import { FuncionariosModule } from 'src/funcionarios/funcionarios.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
   
    TypeOrmModule.forFeature([RegistroPonto]),
    FuncionariosModule
  ],
  controllers: [RegistroPontoController],
  providers: [RegistroPontoService],
  exports: [RegistroPontoService] 
})
export class RegistroPontoModule {}
