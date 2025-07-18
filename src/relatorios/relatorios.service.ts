import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import puppeteer from 'puppeteer';
import { BancoHorasService } from 'src/banco-horas/banco-horas.service';
import { Relatorio } from 'src/relatorios/entities/relatorio.entity';
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
 async gerarEspelhoPontoPDF(funcionarioId: number, ano: number, mes: number): Promise<Buffer> {
        // 1. Reutiliza o método anterior para obter todos os dados
        const dadosRelatorio = await this.gerarEspelhoPonto(funcionarioId, ano, mes);

        // 2. Cria o conteúdo HTML a partir dos dados
        const htmlContent = this.criarHtmlParaRelatorio(dadosRelatorio);

        // 3. Usa o Puppeteer para converter o HTML em PDF
        const browser = await puppeteer.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Necessário para rodar em alguns ambientes (ex: Docker)
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
        });

        await browser.close();
        
        return  Buffer.from(pdfBuffer);
    }



    // --- FUNÇÃO AUXILIAR PARA GERAR O HTML ---
    private criarHtmlParaRelatorio(data: any): string {
        const { funcionario, periodo, registros, saldo_banco_horas_minutos } = data;
        
        // Formata as linhas da tabela de registros
        const linhasRegistros = registros.map(reg => 
            `<tr>
                <td>${new Date(reg.registro).toLocaleDateString('pt-BR')}</td>
                <td>${new Date(reg.registro).toLocaleTimeString('pt-BR')}</td>
                <td>${reg.tipo.charAt(0).toUpperCase() + reg.tipo.slice(1)}</td>
            </tr>`
        ).join('');

        // Formata o saldo de horas
        const horas = Math.floor(Math.abs(saldo_banco_horas_minutos) / 60);
        const minutos = Math.abs(saldo_banco_horas_minutos) % 60;
        const saldoFormatado = `${saldo_banco_horas_minutos < 0 ? '-' : ''}${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;

        // Template HTML (você pode deixar isso muito mais bonito com CSS)
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .header { text-align: center; margin-bottom: 40px; }
                    .header h1 { margin: 0; }
                    .info { margin-bottom: 20px; border: 1px solid #ccc; padding: 10px; }
                    .info p { margin: 5px 0; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    .footer { margin-top: 40px; text-align: right; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Espelho de Ponto</h1>
                    <p>Período: ${String(periodo.mes).padStart(2, '0')}/${periodo.ano}</p>
                </div>
                <div class="info">
                    <p><strong>Funcionário:</strong> ${funcionario.nome}</p>
                    <p><strong>Cargo:</strong> ${funcionario.cargo}</p>
                    <p><strong>CPF:</strong> ${funcionario.cpf}</p>
                </div>
                
                <h3>Registros</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${linhasRegistros}
                    </tbody>
                </table>

                <div class="footer">
                    <p><strong>Saldo do Banco de Horas (HH:MM):</strong> ${saldoFormatado}</p>
                </div>
            </body>
            </html>
        `;
    }


}
