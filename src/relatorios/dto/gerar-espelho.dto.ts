import { IsNotEmpty, IsNumberString } from "class-validator";

export class GerarEspelhoPontoDto{

    @IsNotEmpty()
    @IsNumberString()
    ano: string;

    @IsNotEmpty()
    @IsNumberString()
    mes: string;
}