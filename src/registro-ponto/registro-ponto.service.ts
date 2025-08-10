import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

        async create(createRegistroPontoDto: CreateRegistroPontoDto, funcionarioId: number): Promise<RegistroPonto> {
            createRegistroPontoDto.funcionarioId = funcionarioId;
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
            return this.registroPontoRepository.find({
                relations: ['funcionario'],
                order:{registro: 'DESC'}
            })
        }
        async findAllByFuncionario(funcionarioId: number): Promise<RegistroPonto[]>{
            const funcionarioExists = await this.funcionariosService.exists(funcionarioId);
        if (!funcionarioExists) {
            throw new NotFoundException(`Funcionário com ID "${funcionarioId}" não encontrado.`);
        }

        return this.registroPontoRepository.find({
            where: { funcionarioId },
            relations: ['funcionario'],
            order: { registro: 'ASC' }, // Ordena do mais antigo para o mais novo
        });
 
    }
    async findOne(id: number): Promise<RegistroPonto> {
        const registroPonto = await this.registroPontoRepository.findOne({
            where: { id },
            relations: ['funcionario'],
        });

        if (!registroPonto) {
            throw new NotFoundException(`Registro de Ponto com ID "${id}" não encontrado.`);
        }

        return registroPonto;
    }
    async update(id: number, updateRegistroPontoDto: UpdateRegistroPontoDto): Promise<RegistroPonto> {
        // Se um novo ID de funcionário for fornecido, verifica se ele existe
        if (updateRegistroPontoDto.funcionarioId) {
            const funcionarioExists = await this.funcionariosService.exists(updateRegistroPontoDto.funcionarioId);
            if (!funcionarioExists) {
                throw new BadRequestException(`Funcionário com ID "${updateRegistroPontoDto.funcionarioId}" para atualização não encontrado.`);
            }
        }

        // Carrega o registro existente e mescla as alterações
        const registroPonto = await this.registroPontoRepository.preload({
            id: id,
            ...updateRegistroPontoDto,
        });

        if (!registroPonto) {
            throw new NotFoundException(`Registro de Ponto com ID "${id}" não encontrado para atualização.`);
        }
        
        // Converte a data 
        if(updateRegistroPontoDto.registro) {
            registroPonto.registro = new Date(updateRegistroPontoDto.registro);
        }

        return this.registroPontoRepository.save(registroPonto);
    }
     async remove(id: number): Promise<void> {
        const registroPonto = await this.findOne(id); // Reutiliza o findOne para garantir que o registro exista antes de deletar
        await this.registroPontoRepository.remove(registroPonto);
    }

}
