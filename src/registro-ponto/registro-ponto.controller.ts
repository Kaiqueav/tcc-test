import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Request } from '@nestjs/common';
import { RegistroPontoService } from './registro-ponto.service';
import { CreateRegistroPontoDto } from './dto/create-registro-ponto.dto';
import { RegistroPonto } from './entities/registro-ponto-entity';
import { UpdateFuncionarioDto } from 'src/funcionarios/dto/update-funcionario.dto';
import { UpdateRegistroPontoDto } from './dto/update-registro-ponto';

@Controller('registro-ponto')
export class RegistroPontoController {
    constructor( private readonly registroPontoService : RegistroPontoService ){}
// rota de criação: POST/ registro-ponto

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createRegistroPontoDto: CreateRegistroPontoDto, @Request() req): Promise<RegistroPonto> {
        const user = req.user;

        if (!user) {
            throw new ForbiddenException('Acesso negado.');
        }

        let funcionarioId: number;

        // Se o utilizador for um admin, usa o ID enviado no corpo da requisição.
        if (user.role === 'admin') {
            if (!createRegistroPontoDto.funcionarioId) {
                throw new ForbiddenException('O ID do funcionário é obrigatório para administradores.');
            }
            funcionarioId = createRegistroPontoDto.funcionarioId;
        } 
        // Se for um funcionário, usa o seu próprio ID do token.
        else {
            funcionarioId = user.userId;
        }

        return this.registroPontoService.create(createRegistroPontoDto, funcionarioId);
    }
    
// Listar todos os registros ROTA: /registro-ponto
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<RegistroPonto[]>
    {
        return this.registroPontoService.findAll();
    }
    // Listar todos os registro de um funcionario ROTA: /registro-ponto/funcionario/5
    @Get('funcionario/:funcionarioId')
    @HttpCode(HttpStatus.OK) 
    findAllByFuncionario(@Param('funcionarioId', ParseIntPipe) funcionarioId:number): Promise<RegistroPonto[]>
    {
        return this.registroPontoService.findAllByFuncionario(funcionarioId)
    }

    // Buscar registro especifico por um id. ROTA: /registro-ponto/1
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id', ParseIntPipe) id:number): Promise<RegistroPonto>
    {
        return this.registroPontoService.findOne(id);
    }

    // atualizar funcionario
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id', ParseIntPipe) id: number, @Body() updateRegistroPontoDto: UpdateRegistroPontoDto):Promise<RegistroPonto>
    {
        return this.registroPontoService.update(id, updateRegistroPontoDto    );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number): Promise<void>
    {
        return this.registroPontoService.remove(id);
    }
    
}
