import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { GerarEspelhoPontoDto } from './dto/gerar-espelho.dto';
import { RelatoriosService } from './relatorios.service';

@Controller('relatorios')
export class RelatoriosController {


     constructor(private readonly relatoriosService: RelatoriosService) {}

  @Get('espelho-ponto/funcionario/:id')
  gerarEspelhoPonto(
      @Param('id', ParseIntPipe) id: number,
      @Query() query: GerarEspelhoPontoDto
    ) {
    const ano = parseInt(query.ano, 10);
    const mes = parseInt(query.mes, 10);
    return this.relatoriosService.gerarEspelhoPonto(id, ano, mes);
  }
}
