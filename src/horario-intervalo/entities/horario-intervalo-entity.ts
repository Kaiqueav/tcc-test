import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn,  } from "typeorm";
import{ Funcionario} from "../../funcionarios/entities/funcionario.entity";

@Entity('horario_intervalo')
export class HorarioIntervalo{

    @PrimaryColumn()
    id: number;

    @Column({ type: 'time'})
    incio_intervalo: string

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