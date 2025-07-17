import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BancoHoras } from './entities/banco-horas.entity';
import { FuncionariosService } from 'src/funcionarios/funcionarios.service';
import { RegistroPontoService } from 'src/registro-ponto/registro-ponto.service';
import { HorarioTrabalhoService } from 'src/horario-trabalho/horario-trabalho.service';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistroPonto } from 'src/registro-ponto/entities/registro-ponto-entity';

@Injectable()
export class BancoHorasService {

constructor(
    @InjectRepository(BancoHoras)
    private readonly bancoHorasRepository: Repository<BancoHoras>,
    private readonly funcionariosService: FuncionariosService,
    private readonly registroPontoService: RegistroPontoService,
    private readonly horarioTrabalhoService: HorarioTrabalhoService,
  ) {}

  async findByFuncionario(funcionarioId: number): Promise<BancoHoras> {
    const funcionario = await this.funcionariosService.findOne(funcionarioId);
    let bancoHoras = await this.bancoHorasRepository.findOne({ where: { funcionario_id: funcionarioId } });

    if (!bancoHoras) {
      // Se não existir, cria um novo registro de banco de horas zerado
      bancoHoras = this.bancoHorasRepository.create({ funcionario_id: funcionarioId, saldo_minutos: 0 });
      await this.bancoHorasRepository.save(bancoHoras);
    }
    
    bancoHoras.funcionario = funcionario;
    return bancoHoras;
  }

  
  async calcularEAtualizar(funcionarioId: number, dataInicio: Date, dataFim: Date): Promise<BancoHoras> {
    const horariosTrabalho = await this.horarioTrabalhoService.findAllByFuncionario(funcionarioId);
    const registrosPonto = await this.registroPontoService.findAllByFuncionario(funcionarioId);
    
    const registrosNoPeriodo = registrosPonto.filter(r => r.registro >= dataInicio && r.registro <= dataFim);
    
    let saldoMinutosCalculado = 0;

    const dias = this.agruparRegistrosPorDia(registrosNoPeriodo);

    //                **** SOLUÇÃO AQUI ****
    dias.forEach((diaRegistros: RegistroPonto[]) => {
        // Agora o TypeScript sabe que 'diaRegistros' é um array de 'RegistroPonto'

        const diaDaSemana = new Date(diaRegistros[0].registro).getDay();
        const jornadaDoDia = horariosTrabalho.find(h => h.dia_semana === diaDaSemana);

        // A verificação de 'length' agora é válida
        if (jornadaDoDia && diaRegistros.length >= 2) {
            const entrada = diaRegistros[0].registro;
            const saida = diaRegistros[diaRegistros.length - 1].registro;

            const minutosTrabalhados = (saida.getTime() - entrada.getTime()) / (1000 * 60);
            
            const [horaInicio, minutoInicio] = jornadaDoDia.horario_inicio.split(':').map(Number);
            const [horaFim, minutoFim] = jornadaDoDia.hora_saida.split(':').map(Number);
            const minutosEsperados = (horaFim * 60 + minutoFim) - (horaInicio * 60 + minutoInicio);

            saldoMinutosCalculado += (minutosTrabalhados - minutosEsperados);
        }
    });

    const bancoHoras = await this.findByFuncionario(funcionarioId);
    bancoHoras.saldo_minutos = Math.round(saldoMinutosCalculado);
    bancoHoras.ultima_atualizacao = new Date();

    return this.bancoHorasRepository.save(bancoHoras);
  }

  // Função auxiliar para agrupar registros
    private agruparRegistrosPorDia(registros: RegistroPonto[]): RegistroPonto[][] {
      const grouped: { [key: string]: RegistroPonto[] } = {};
      registros.forEach(r => {
          const dia = r.registro.toISOString().split('T')[0];
          if (!grouped[dia]) grouped[dia] = [];
          grouped[dia].push(r);
      });
      return Object.values(grouped);
  }
}
