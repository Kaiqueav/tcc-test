import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";


@Entity('funcionarios')
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
    
 }