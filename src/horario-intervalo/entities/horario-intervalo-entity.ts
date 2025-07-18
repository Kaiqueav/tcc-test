import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn,  } from "typeorm";
import{ Funcionario} from "../../funcionarios/entities/funcionario.entity";

@Entity('horario_intervalo')
export class HorarioIntervalo{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'time'})
    inicio_intervalo: string

    @Column({ type: 'time'})
    fim_intervalo: string

    @Column()
    funcionario_id: number

     @ManyToOne(() => Funcionario, (funcionario) => funcionario.horariosIntervalo, {
    onDelete: 'CASCADE',
     })
    @JoinColumn({ name: 'funcionario_id' })
    funcionario: Funcionario;
}