import { Funcionario } from "src/funcionarios/entities/funcionario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('relatorios')
export class Relatorio{

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    data_geracao: Date;

    @Column()
    tipo_relatorio:string

    @Column()
    funcionario_id: number;

    @ManyToOne(() => Funcionario, (funcionario) => funcionario.relatorios)
    @JoinColumn({ name: 'funcionario_id' })
    funcionario: Funcionario;

    
    @UpdateDateColumn()
    ultima_atualizacao: Date;

}