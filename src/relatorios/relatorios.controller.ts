import { Controller, Get, Param, ParseIntPipe, Query, Res } from '@nestjs/common';
import { GerarEspelhoPontoDto } from './dto/gerar-espelho.dto';
import { RelatoriosService } from './relatorios.service';
import { Response } from 'express';
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

   @Get('espelho-ponto/funcionario/:id/pdf')
  async gerarEspelhoPontoPDF(
      @Param('id', ParseIntPipe) id: number,
      @Query() query: GerarEspelhoPontoDto,
      @Res() res: Response 
    ) {
    const ano = parseInt(query.ano, 10);
    const mes = parseInt(query.mes, 10);

    const pdfBuffer = await this.relatoriosService.gerarEspelhoPontoPDF(id, ano, mes);

    res.setHeader('Content-Type', 'application/pdf');

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="espelho-ponto-${ano}-${mes}-${id}.pdf"`
    );
    
    
    res.send(pdfBuffer);
  }
}
