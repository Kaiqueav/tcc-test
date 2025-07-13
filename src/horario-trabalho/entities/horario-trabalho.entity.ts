import { Funcionario } from "src/funcionarios/entities/funcionario.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('horario_trabalho')
export class HorarioTrabalho{

    @PrimaryGeneratedColumn()
    id:number

    @Column({type: 'int'})
    dia_semana:number
    
    @Column()
    horario_inicio: string

    @Column()
    horario_fim:string

    @Column()
    funcionario_id: number;

    @ManyToOne(()=> Funcionario, (funcionario) => funcionario.horariosTrabalho,{
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'funcionario_id'})
        funcionario: Funcionario
    
}