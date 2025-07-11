import { IsNotEmpty, IsNumber, IsDateString, IsIn, IsString } from "class-validator";

export class CreateRegistroPontoDto{
    @IsNotEmpty()
    @IsNumber()
    funcionarioId: number;
    
    @IsNotEmpty()
    @IsDateString()
    registro: string;
    
    @IsNotEmpty()
    @IsString()
    @IsIn(['entrada', 'saida', 'intervalo_inicio', 'intervalo_fim'])
    tipo: string;
    
}