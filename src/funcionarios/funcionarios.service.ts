import { Injectable, NotFoundException } from '@nestjs/common';
import { Funcionario } from './entities/funcionario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';

@Injectable()
export class FuncionariosService {
    constructor(
        @InjectRepository(Funcionario)
        private readonly funcionarioRepository: Repository<Funcionario>
    ){}
    
    async create(CreateFuncionarioDto: CreateFuncionarioDto): Promise<Funcionario>
    {
        const funcionario = this.funcionarioRepository.create(CreateFuncionarioDto);
        return this.funcionarioRepository.save(funcionario);
        }
    async findAll(): Promise<Funcionario[]>{
        return this.funcionarioRepository.find();
    
    }
     async findOne(id: number): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepository.findOne({ where: { id } });
    if (!funcionario) {
      throw new NotFoundException(`Funcionario with ID "${id}" not found.`);
    }
    return funcionario;
  }
   async findOneByCpf(cpf: string): Promise<Funcionario> {
        const funcionario = await this.funcionarioRepository.findOne({ where: { cpf } });
        if (!funcionario) {
      throw new NotFoundException(`Funcionario com o cpf "${cpf}" não encontrado.`);
         // return null;
        }
        return funcionario;
    }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto): Promise<Funcionario> {
    const funcionario = await this.findOne(id); // checa se essa prr existe
    this.funcionarioRepository.merge(funcionario, updateFuncionarioDto);
    return this.funcionarioRepository.save(funcionario);
  }

  async remove(id: number): Promise<void> {
    const result = await this.funcionarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Funcionario with ID "${id}" not found.`);
    }
  }

    async exists(id: number): Promise<boolean> {
    const count = await this.funcionarioRepository.count({ where: { id } });
    return count > 0;
  }

}
