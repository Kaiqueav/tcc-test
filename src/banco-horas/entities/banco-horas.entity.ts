import { Funcionario } from "src/funcionarios/entities/funcionario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('banco_horas')
export class BancoHoras{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int', default: 0})
    saldo_minutos:number

    @Column()
  funcionario_id: number;
  
  // Um funcionário tem apenas um registro de banco de horas
  @OneToOne(() => Funcionario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  ultima_atualizacao: Date;
}