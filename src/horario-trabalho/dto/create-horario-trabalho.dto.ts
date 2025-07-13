import { IsInt, IsNotEmpty, IsString, Matches, Max, Min } from "class-validator";

export class CreateHorarioTrabalhoDTO{

  @IsInt({ message: 'O dia da semana deve ser um número inteiro.' })
  @Min(0, { message: 'O dia da semana deve ser entre 0 (Domingo) e 6 (Sábado).' })
  @Max(6, { message: 'O dia da semana deve ser entre 0 (Domingo) e 6 (Sábado).' })
  @IsNotEmpty({ message: 'O dia da semana é obrigatório.' })
  dia_semana: number;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'A hora de início deve estar no formato HH:MM.'})
  @IsNotEmpty({ message: 'A hora de início é obrigatória.' })
  hora_inicio: string;
  
  @IsInt()
  @IsNotEmpty({ message: 'O ID do funcionário é obrigatório.' })
  funcionario_id: number;
}