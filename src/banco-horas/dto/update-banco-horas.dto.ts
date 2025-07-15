import { IsInt, IsOptional } from "class-validator";

export class UpdateBancoHorasDto{
    @IsInt()
    @IsOptional()
        saldo_minutos?: number
}