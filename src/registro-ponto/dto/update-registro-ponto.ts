import { PartialType } from "@nestjs/mapped-types";
import { CreateRegistroPontoDto } from "./create-registro-ponto.dto";

export class UpdateRegistroPontoDto extends PartialType(CreateRegistroPontoDto){}