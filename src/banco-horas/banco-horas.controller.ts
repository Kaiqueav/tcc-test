import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BancoHoras } from './entities/banco-horas.entity';
import { BancoHorasService } from './banco-horas.service';

@Controller('banco-horas')
export class BancoHorasController {

    constructor(private readonly bancoHorasService: BancoHorasService) {}

  @Get('funcionario/:id')
  findByFuncionario(@Param('id', ParseIntPipe) id: number): Promise<BancoHoras> {
    return this.bancoHorasService.findByFuncionario(id);
  }

  // Endpoint para disparar o cálculo
  @Post('calcular/funcionario/:id')
  calcular(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { dataInicio: string, dataFim: string }
  ): Promise<BancoHoras> {
    const dataInicio = new Date(body.dataInicio);
    const dataFim = new Date(body.dataFim);
    return this.bancoHorasService.calcularEAtualizar(id, dataInicio, dataFim);
  }
}
