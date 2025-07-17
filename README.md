<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Controle de Ponto - API</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
            line-height: 1.6;
            color: #24292e;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
        }
        h1, h2, h3 {
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
        }
        h1 { font-size: 2.25em; }
        h2 { font-size: 1.75em; }
        h3 { font-size: 1.5em; }
        a {
            color: #0366d6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        code {
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
            background-color: rgba(27,31,35,0.05);
            padding: 0.2em 0.4em;
            margin: 0;
            font-size: 85%;
            border-radius: 3px;
        }
        pre {
            background-color: #f6f8fa;
            border-radius: 3px;
            padding: 16px;
            overflow: auto;
        }
        pre code {
            padding: 0;
            margin: 0;
            font-size: 100%;
            background-color: transparent;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin-bottom: 0.5em;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1em;
            display: block;
            overflow: auto;
        }
        th, td {
            border: 1px solid #dfe2e5;
            padding: 8px 12px;
        }
        th {
            font-weight: 600;
            background-color: #f6f8fa;
        }
        blockquote {
            border-left: 0.25em solid #dfe2e5;
            padding: 0 1em;
            color: #6a737d;
            margin-left: 0;
        }
        .badges img {
            margin-right: 5px;
        }
    </style>
</head>
<body>
    <h1>Sistema de Controle de Ponto - API</h1>
    <div class="badges">
        <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
        <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
        <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
    </div>
    <p>API robusta para um sistema de controle de ponto, desenvolvida com NestJS. O projeto oferece uma solução completa para gerenciamento de funcionários, registro de ponto, cálculo de banco de horas e geração de relatórios.</p>

    <h2>✨ Funcionalidades</h2>
    <p>O sistema foi arquitetado para ser modular e escalável, incluindo as seguintes funcionalidades:</p>
    <ul>
        <li><strong>Gestão de Funcionários:</strong> CRUD completo para cadastro e gerenciamento de colaboradores.</li>
        <li><strong>Horários de Trabalho e Intervalo:</strong> Definição de jornadas de trabalho e intervalos flexíveis por funcionário.</li>
        <li><strong>Registro de Ponto:</strong>
            <ul>
                <li>Registro manual via API.</li>
                <li><strong>Registro via QR Code com validação de Geolocalização</strong> para previnir fraudes.</li>
            </ul>
        </li>
        <li><strong>Banco de Horas:</strong> Lógica de cálculo automatizada para horas extras e horas devidas, considerando dias úteis, fins de semana e feriados.</li>
        <li><strong>Geração de Relatórios (Espelho de Ponto):</strong>
            <ul>
                <li>Exportação dos dados consolidados em formato JSON.</li>
                <li><strong>Geração</strong> de relatórios em <strong>PDF</strong> utilizando Puppeteer para uma apresentação profissional.</li>
            </ul>
        </li>
        <li><strong>Dashboard Administrativo:</strong> Endpoint que agrega dados vitais para uma visão geral da operação (total de funcionários, maiores e menores saldos de horas).</li>
        <li><strong>Filas de Processamento (Jobs):</strong> Uso de Bull e Redis para processar tarefas demoradas (como a geração de PDFs) em segundo plano, garantindo que a API permaneça rápida e responsiva.</li>
        <li><strong>Segurança:</strong>
            <ul>
                <li>Uso de variáveis de ambiente com <code>ConfigModule</code> para proteger dados sensíveis.</li>
                <li>Estrutura preparada para implementação de autenticação JWT e controle de acesso por papéis (Guards).</li>
            </ul>
        </li>
    </ul>

    <h2>🚀 Tecnologias Utilizadas</h2>
    <ul>
        <li><strong>Backend:</strong> <a href="https://nestjs.com/">NestJS</a>, <a href="https://www.typescriptlang.org/">TypeScript</a></li>
        <li><strong>Banco de Dados:</strong> <a href="https://www.mysql.com/">MySQL</a></li>
        <li><strong>ORM:</strong> <a href="https://typeorm.io/">TypeORM</a></li>
        <li><strong>Ambiente de Desenvolvimento:</strong> <a href="https://www.docker.com/">Docker</a>, <a href="https://docs.docker.com/compose/">Docker Compose</a></li>
        <li><strong>Filas (Queues):</strong> <a href="https://redis.io/">Redis</a>, <a href="https://github.com/OptimalBits/bull">Bull</a></li>
        <li><strong>Geração de PDF:</strong> <a href="https://pptr.dev/">Puppeteer</a></li>
        <li><strong>Validação:</strong> <code>class-validator</code>, <code>class-transformer</code></li>
    </ul>

    <h2>📋 Pré-requisitos</h2>
    <p>Antes de começar, você vai precisar ter instalado em sua máquina:</p>
    <ul>
        <li><a href="https://nodejs.org/en/">Node.js</a> (v16 ou superior)</li>
        <li><a href="https://www.npmjs.com/">npm</a> ou <a href="https://yarnpkg.com/">Yarn</a></li>
        <li><a href="https://www.docker.com/products/docker-desktop/">Docker</a> e <a href="https://docs.docker.com/compose/install/">Docker Compose</a></li>
    </ul>

    <h2>⚙️ Como Rodar o Projeto</h2>
    <p>Siga os passos abaixo para executar a aplicação localmente.</p>
    
    <h3>1. Clonar o Repositório</h3>
    <pre><code>git clone https://github.com/kaiqueav/tcc-test.git
cd tcc-test</code></pre>

    <h3>2. Configurar Variáveis de Ambiente</h3>
    <p>Crie um arquivo chamado <code>.env</code> na raiz do projeto. Você pode copiar o exemplo abaixo e preencher com suas informações.</p>
    <p><strong>.env.example</strong></p>
    <pre><code># Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=controle_ponto

# Configurações do Redis (para as filas)
REDIS_HOST=localhost
REDIS_PORT=6379

# Segredo para autenticação JWT (exemplo)
JWT_SECRET=SEU_SEGREDO_SUPER_SECRETO_AQUI</code></pre>
    <blockquote><strong>Atenção:</strong> O arquivo <code>.env</code> contém informações sensíveis e não deve ser versionado no Git. Certifique-se de que ele está no seu <code>.gitignore</code>.</blockquote>

    <h3>3. Iniciar os Serviços com Docker</h3>
    <p>Este comando irá iniciar os contêineres do MySQL e do Redis em segundo plano.</p>
    <pre><code>docker-compose up -d</code></pre>

    <h3>4. Instalar as Dependências</h3>
    <pre><code>npm install</code></pre>

    <h3>5. Rodar a Aplicação</h3>
    <p>Este comando inicia o servidor em modo de desenvolvimento com hot-reload.</p>
    <pre><code>npm run start:dev</code></pre>
    <p>A aplicação estará disponível em <code>http://localhost:3000</code>.</p>

    <h2>Scripts Disponíveis</h2>
    <ul>
        <li><code>npm run start:dev</code>: Inicia a aplicação em modo de desenvolvimento.</li>
        <li><code>npm run build</code>: Compila o código TypeScript para JavaScript.</li>
        <li><code>npm run start:prod</code>: Inicia a aplicação em modo de produção (após o build).</li>
        <li><code>npm run lint</code>: Executa o linter para verificar a qualidade do código.</li>
        <li><code>npm run test</code>: Roda os testes unitários.</li>
        <li><code>npm run test:e2e</code>: Roda os testes de ponta a ponta (end-to-end).</li>
        <li><code>npm run test:cov</code>: Roda os testes e gera um relatório de cobertura.</li>
    </ul>

    <h2>Endpoints da API (Exemplos)</h2>
    <table>
        <thead>
            <tr>
                <th>Método</th>
                <th>Rota</th>
                <th>Descrição</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>POST</code></td>
                <td><code>/funcionarios</code></td>
                <td>Cria um novo funcionário.</td>
            </tr>
            <tr>
                <td><code>GET</code></td>
                <td><code>/funcionarios</code></td>
                <td>Lista todos os funcionários.</td>
            </tr>
            <tr>
                <td><code>POST</code></td>
                <td><code>/registro-ponto/qrcode</code></td>
                <td>Registra um ponto via QR Code e geolocalização.</td>
            </tr>
            <tr>
                <td><code>GET</code></td>
                <td><code>/banco-horas/funcionario/{id}</code></td>
                <td>Consulta o saldo do banco de horas de um funcionário.</td>
            </tr>
            <tr>
                <td><code>POST</code></td>
                <td><code>/relatorios/espelho-ponto/funcionario/{id}/gerar-pdf</code></td>
                <td>Adiciona a geração de um relatório PDF à fila.</td>
            </tr>
            <tr>
                <td><code>GET</code></td>
                <td><code>/dashboard/admin</code></td>
                <td>Retorna os dados consolidados para o dashboard.</td>
            </tr>
        </tbody>
    </table>
    <hr>
    <p><em>Este README foi gerado com base na estrutura e funcionalidades do projeto. Sinta-se à vontade para adaptá-lo!</em></p>
</body>
</html>