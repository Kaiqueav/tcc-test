import { PartialType } from "@nestjs/mapped-types";
import { CreateHorarioTrabalhoDTO } from "./create-horario-trabalho.dto";

export class UpdateHorarioTrabalhoDTO  extends PartialType (CreateHorarioTrabalhoDTO){}