import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RegistroPonto } from '../../registro-ponto/entities/registro-ponto-entity';
import { HorarioIntervalo } from '../../horario-intervalo/entities/horario-intervalo-entity';
import { HorarioTrabalho } from "src/horario-trabalho/entities/horario-trabalho.entity";
import { BancoHoras } from "src/banco-horas/entities/banco-horas.entity";
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
     

    @Column({ unique: true, length: 100 })
    email: string;

    
    @Column({ length: 100 })
    cargo: string;

  // Relationships
  @OneToMany(() => RegistroPonto, (registroPonto) => registroPonto.funcionario)
  registrosPonto: RegistroPonto[];

  @OneToMany(() => HorarioIntervalo, (horarioIntervalo) => horarioIntervalo.funcionario)
 horariosIntervalo: HorarioIntervalo[];
   @OneToMany(() => HorarioTrabalho, (horarioTrabalho) => horarioTrabalho.funcionario)
  horariosTrabalho: HorarioTrabalho[];
  @OneToMany(() => BancoHoras, (bancoHoras) => bancoHoras.funcionario)
  bancoHoras: BancoHoras[];
}
 
/*




  

  @OneToMany(() => Relatorio, (relatorio) => relatorio.funcionario)
  relatorios: Relatorio[];
 }*/
