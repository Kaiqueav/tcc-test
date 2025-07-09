import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';

@Controller('funcionarios')
export class FuncionariosController {
    constructor(private readonly funcionariosService: FuncionariosService){
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createFuncionarioDTO:CreateFuncionarioDto){
        return this.funcionariosService.create(createFuncionarioDTO)
    }
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(){
        return this.funcionariosService.findAll()
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcionariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuncionarioDto: UpdateFuncionarioDto) {
    return this.funcionariosService.update(+id, updateFuncionarioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content for successful deletion
  remove(@Param('id') id: string) {
    return this.funcionariosService.remove(+id);
  }
}
