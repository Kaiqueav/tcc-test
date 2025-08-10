import { IsNotEmpty, IsString } from 'class-validator';

export class LoginPontoDto {
  @IsString()
  @IsNotEmpty()
  cpf: string;
}