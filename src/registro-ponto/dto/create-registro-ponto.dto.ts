import { IsNotEmpty, IsNumber, IsDateString, IsIn, IsString, IsOptional } from "class-validator";

export class CreateRegistroPontoDto{
    @IsOptional()
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