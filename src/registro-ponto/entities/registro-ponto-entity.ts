import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Funcionario } from "src/funcionarios/entities/funcionario.entity";


@Entity('registro_ponto')
export class RegistroPonto{


     @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'funcionario_id' })
  funcionarioId: number;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.registrosPonto, {
    onDelete: 'CASCADE', // If employee is deleted, cascade delete their records
  })
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;

  @Column({ type: 'timestamp' }) // Store the exact timestamp of the record
  registro: Date;

  @Column({ length: 20 }) // 'entrada', 'saida', 'intervalo_inicio', 'intervalo_fim'
  tipo: string;

  @CreateDateColumn()
  createdAt: Date; // Timestamp for when the record was *created* in the system
}