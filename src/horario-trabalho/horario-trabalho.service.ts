import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HorarioTrabalho } from './entities/horario-trabalho.entity';
import { Repository } from 'typeorm';
import { FuncionariosService } from 'src/funcionarios/funcionarios.service';
import { CreateHorarioTrabalhoDTO } from './dto/create-horario-trabalho.dto';
import { UpdateHorarioTrabalhoDTO } from './dto/update-horario-trabalho.dto';

@Injectable()
export class HorarioTrabalhoService {

     constructor( 
        @InjectRepository(HorarioTrabalho)
        private readonly horarioTrabalhoRepository: Repository<HorarioTrabalho>,
         private readonly funcionariosService: FuncionariosService
    
     ){}
    
     async create(createDto: CreateHorarioTrabalhoDTO): Promise<HorarioTrabalho> {
        await this.validaFuncionario(createDto.funcionario_id);
        const horario = this.horarioTrabalhoRepository.create(createDto);
        return this.horarioTrabalhoRepository.save(horario);
      }
    
      async findAllByFuncionario(funcionarioId: number): Promise<HorarioTrabalho[]> {
        await this.validaFuncionario(funcionarioId);
        return this.horarioTrabalhoRepository.find({ where: { funcionario_id: funcionarioId}, order:{dia_semana: 'ASC'} });
      }
      
      async findOne(id: number): Promise<HorarioTrabalho> {
        const horario = await this.horarioTrabalhoRepository.findOne({ where: { id } });
        if (!horario) {
          throw new NotFoundException(`Horário de trabalho com ID ${id} não encontrado.`);
        }
        return horario;
      }
    
      async update(id: number, updateDto: UpdateHorarioTrabalhoDTO): Promise<HorarioTrabalho> {
        const horario = await this.horarioTrabalhoRepository.preload({ id, ...updateDto });
        if (!horario) {
          throw new NotFoundException(`Horário de trabalho com ID ${id} não encontrado.`);
        }
        return this.horarioTrabalhoRepository.save(horario);
      }
    
      async remove(id: number): Promise<void> {
        const horario = await this.findOne(id);
        await this.horarioTrabalhoRepository.remove(horario);
      }
    
      private async validaFuncionario(id: number) {
        const funcionarioExists = await this.funcionariosService.exists(id);
        if (!funcionarioExists) {
          throw new BadRequestException(`Funcionário com ID ${id} não existe.`);
        }
      }
}
