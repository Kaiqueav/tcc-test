import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegistroPontoDto } from './dto/create-registro-ponto.dto';
import { UpdateRegistroPontoDto } from './dto/update-registro-ponto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistroPonto } from './entities/registro-ponto-entity';
import { Repository } from 'typeorm';
import { FuncionariosService } from 'src/funcionarios/funcionarios.service';
@Injectable()
export class RegistroPontoService {
    constructor(
        @InjectRepository(RegistroPonto)
        private readonly registroPontoRepository:Repository <RegistroPonto>,
        private readonly funcionariosService: FuncionariosService ){}

        async create(createRegistroPontoDto: CreateRegistroPontoDto): Promise<RegistroPonto> {
    // Internal Communication: Check if the employee exists before creating a time record
            const funcionarioExists = await this.funcionariosService.exists(createRegistroPontoDto.funcionarioId);
            if (!funcionarioExists) {
            throw new BadRequestException(`Funcionario with ID "${createRegistroPontoDto.funcionarioId}" not found.`);
            }

            const registroPonto = this.registroPontoRepository.create({
            ...createRegistroPontoDto,
            registro: new Date(createRegistroPontoDto.registro), // Convert string to Date object
            });
            return this.registroPontoRepository.save(registroPonto);
        }
        async findAll(): Promise<RegistroPonto[]>{
            return this.registroPontoRepository.find({relations: ['funcionario']})
        }
}
