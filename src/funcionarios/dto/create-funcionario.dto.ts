import { IsString, IsEmail, IsNotEmpty, IsInt, MinLength } from 'class-validator';

export class CreateFuncionarioDto{
    @IsString()
    @IsNotEmpty()
    nome: String
   
    @IsNotEmpty()  
    @IsEmail()  
    email: String
    @IsString()
  @IsNotEmpty()
  @MinLength(11, { message: 'CPF deve ter no mínimo 11 caracteres (apenas números).' }) 
  cpf: string;

  @IsString() 
  @IsNotEmpty()
  admissao: string; 

  @IsInt()
  @IsNotEmpty()
  carga_horaria: number;
}     


