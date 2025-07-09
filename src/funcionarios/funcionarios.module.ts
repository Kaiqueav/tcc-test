import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { FuncionariosService } from './funcionarios.service';
import { FuncionariosController } from './funcionarios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Funcionario])], // Register Funcionario entity with TypeORM
  controllers: [FuncionariosController],
  providers: [FuncionariosService],
  exports: [FuncionariosService, TypeOrmModule],})
export class FuncionariosModule {}

