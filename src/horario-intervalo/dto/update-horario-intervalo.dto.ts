import { PartialType } from "@nestjs/mapped-types";
import { CreateHorarioIntervaloDto } from "./create-horario-intervalo.dto";

export class UpdateHorarioIntervaloDto extends PartialType(CreateHorarioIntervaloDto)
{}