import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('adm')
export class Adm{
    @PrimaryGeneratedColumn()
        id: number;
    @Column({unique: true})
        email:string;
    @Column()
        password: string

}