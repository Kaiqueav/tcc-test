import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RegistroPonto } from '../../registro-ponto/entities/registro-ponto-entity';
//import { HorarioTrabalho } from '../horario-trabalho/horario-trabalho.entity';
//import { HorarioIntervalo } from '../horario-intervalo/horario-intervalo.entity';
//import { BancoHoras } from '../banco-horas/banco-horas.entity';
//import { Relatorio } from '../relatorio/relatorio.entity';

@Entity('funcionario')
 export class Funcionario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255})
    nome: string

    @Column({unique: true, length: 14})
    cpf:string

    @Column({ type: 'date' })
    admissao: Date; 

    @Column({ type: 'int' })
    carga_horaria: number;
      

  // Relationships
  @OneToMany(() => RegistroPonto, (registroPonto) => registroPonto.funcionario)
  registrosPonto: RegistroPonto[];

  @OneToMany(() => HorarioTrabalho, (horarioTrabalho) => horarioTrabalho.funcionario)
  horariosTrabalho: HorarioTrabalho[];

  @OneToMany(() => HorarioIntervalo, (horarioIntervalo) => horarioIntervalo.funcionario)
  horariosIntervalo: HorarioIntervalo[];

  @OneToMany(() => BancoHoras, (bancoHoras) => bancoHoras.funcionario)
  bancoHoras: BancoHoras[];

  @OneToMany(() => Relatorio, (relatorio) => relatorio.funcionario)
  relatorios: Relatorio[];
 }