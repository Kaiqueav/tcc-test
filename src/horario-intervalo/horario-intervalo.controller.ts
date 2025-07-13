import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { HorarioIntervaloService } from './horario-intervalo.service';
import { CreateHorarioIntervaloDto } from './dto/create-horario-intervalo.dto';
import { UpdateHorarioIntervaloDto } from './dto/update-horario-intervalo.dto';

@Controller('horario-intervalo')
export class HorarioIntervaloController {
    constructor ( private readonly horarioIntervaloService: HorarioIntervaloService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()createHorarioIntervaloDto: CreateHorarioIntervaloDto){
        return this.horarioIntervaloService.create(createHorarioIntervaloDto);
    }
     @Get('funcionario/:id')
     @HttpCode(HttpStatus.OK)
    findAllByFuncionario(@Param('id', ParseIntPipe) id: number) {
    return this.horarioIntervaloService.findAllByFuncionario(id);
    }
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id', ParseIntPipe)id: number,@Body()updateHorarioIntervaloDto: UpdateHorarioIntervaloDto){
        return this.horarioIntervaloService.update(id, updateHorarioIntervaloDto);

    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe)id: number){
        return this.horarioIntervaloService.remove(id);
    }



}
