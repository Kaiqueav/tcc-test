import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HorarioIntervalo } from './entities/horario-intervalo-entity';
import { CreateHorarioIntervaloDto } from './dto/create-horario-intervalo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FuncionariosService } from 'src/funcionarios/funcionarios.service';
import { UpdateHorarioIntervaloDto } from './dto/update-horario-intervalo.dto';

@Injectable()
export class HorarioIntervaloService {
 constructor( 
    @InjectRepository(HorarioIntervalo)
    private readonly horarioIntervaloRepository: Repository<HorarioIntervalo>,
     private readonly funcionariosService: FuncionariosService

 ){}

 async create(createDto: CreateHorarioIntervaloDto): Promise<HorarioIntervalo> {
    await this.validaFuncionario(createDto.funcionario_id);
    const horario = this.horarioIntervaloRepository.create(createDto);
    return this.horarioIntervaloRepository.save(horario);
  }

  async findAllByFuncionario(funcionarioId: number): Promise<HorarioIntervalo[]> {
    await this.validaFuncionario(funcionarioId);
    return this.horarioIntervaloRepository.find({ where: { funcionario_id: funcionarioId } });
  }
  
  async findOne(id: number): Promise<HorarioIntervalo> {
    const horario = await this.horarioIntervaloRepository.findOne({ where: { id } });
    if (!horario) {
      throw new NotFoundException(`Horário de trabalho com ID ${id} não encontrado.`);
    }
    return horario;
  }

  async update(id: number, updateDto: UpdateHorarioIntervaloDto): Promise<HorarioIntervalo> {
    const horario = await this.horarioIntervaloRepository.preload({ id, ...updateDto });
    if (!horario) {
      throw new NotFoundException(`Horário de trabalho com ID ${id} não encontrado.`);
    }
    return this.horarioIntervaloRepository.save(horario);
  }

  async remove(id: number): Promise<void> {
    const horario = await this.findOne(id);
    await this.horarioIntervaloRepository.remove(horario);
  }

  private async validaFuncionario(id: number) {
    const funcionarioExists = await this.funcionariosService.exists(id);
    if (!funcionarioExists) {
      throw new BadRequestException(`Funcionário com ID ${id} não existe.`);
    }
  }
}
  