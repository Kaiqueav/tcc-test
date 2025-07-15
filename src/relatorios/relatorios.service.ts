import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BancoHorasService } from 'src/banco-horas/banco-horas.service';
import { Relatorio } from 'src/banco-horas/entities/relatorio.entity';
import { FuncionariosService } from 'src/funcionarios/funcionarios.service';
import { RegistroPontoService } from 'src/registro-ponto/registro-ponto.service';
import { Repository } from 'typeorm';

@Injectable()
export class RelatoriosService {


 constructor(
        @InjectRepository(Relatorio)
        private readonly relatorioRepository: Repository<Relatorio>,
        private readonly funcionariosService: FuncionariosService,
        private readonly registroPontoService: RegistroPontoService,
        private readonly bancoHorasService: BancoHorasService,
    ) {}
    
    async gerarEspelhoPonto(funcionarioId: number, ano: number, mes: number) {
        // 1. Buscar os dados necessários
        const funcionario = await this.funcionariosService.findOne(funcionarioId);
        const registros = await this.registroPontoService.findAllByFuncionario(funcionarioId);
        const bancoHoras = await this.bancoHorasService.findByFuncionario(funcionarioId);
        
        // Filtra os registros para o mês e ano especificados
        const registrosDoMes = registros.filter(r => {
            const dataRegistro = new Date(r.registro);
            return dataRegistro.getFullYear() === ano && dataRegistro.getMonth() + 1 === mes;
        });

        // 2. Logar a geração do relatório
        const logRelatorio = this.relatorioRepository.create({
            tipo_relatorio: `espelho_ponto_${ano}_${mes}`,
            funcionario_id: funcionarioId,
        });
        await this.relatorioRepository.save(logRelatorio);

        // 3. Montar o objeto de resposta do relatório
        return {
            gerado_em: new Date(),
            funcionario: {
                id: funcionario.id,
                nome: funcionario.nome,
                cpf: funcionario.cpf,
                cargo: funcionario.cargo,
            },
            periodo: { ano, mes },
            registros: registrosDoMes,
            saldo_banco_horas_minutos: bancoHoras.saldo_minutos,
        };
    }

}
