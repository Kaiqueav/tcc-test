import { IsString, IsEmail, IsNotEmpty, IsInt, MinLength } from 'class-validator';

export class CreateFuncionarioDto{
    @IsString()
    @IsNotEmpty()
    nome: String
}