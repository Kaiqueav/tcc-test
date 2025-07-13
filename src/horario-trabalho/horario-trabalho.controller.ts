import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { HorarioTrabalhoService } from './horario-trabalho.service';
import { CreateHorarioTrabalhoDTO } from './dto/create-horario-trabalho.dto';
import { UpdateHorarioTrabalhoDTO } from './dto/update-horario-trabalho.dto';

@Controller('horario-trabalho')
export class HorarioTrabalhoController {
     constructor(private readonly horarioTrabalhoService: HorarioTrabalhoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createHorarioTrabalhoDto: CreateHorarioTrabalhoDTO) {
    return this.horarioTrabalhoService.create(createHorarioTrabalhoDto);
  }
  
  @Get('funcionario/:id')
  findAllByFuncionario(@Param('id', ParseIntPipe) id: number) {
    return this.horarioTrabalhoService.findAllByFuncionario(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateHorarioTrabalhoDto: UpdateHorarioTrabalhoDTO) {
    return this.horarioTrabalhoService.update(id, updateHorarioTrabalhoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.horarioTrabalhoService.remove(id);
  }
}
