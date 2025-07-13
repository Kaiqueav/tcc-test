import { IsInt, IsNotEmpty, Matches } from 'class-validator';

export class CreateHorarioIntervaloDto {
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'A hora de início do intervalo deve estar no formato HH:MM.'})
  @IsNotEmpty({ message: 'A hora de início do intervalo é obrigatória.' })
  inicio_intervalo: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'A hora de fim do intervalo deve estar no formato HH:MM.'})
  @IsNotEmpty({ message: 'A hora de fim do intervalo é obrigatória.' })
  fim_intervalo: string;

  @IsInt()
  @IsNotEmpty({ message: 'O ID do funcionário é obrigatório.' })
  funcionario_id: number;
}