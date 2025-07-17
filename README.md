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
    <p>API para um sistema de controle de ponto, desenvolvida com NestJS e TypeORM. O projeto oferece uma base sólida para gerenciamento de funcionários e registro de ponto, utilizando um ambiente de desenvolvimento conteinerizado com Docker.</p>

    <h2>✨ Funcionalidades Implementadas</h2>
    <ul>
        <li>
            <strong>Módulo de Funcionários:</strong>
            <ul>
                <li>Cadastro de novos funcionários.</li>
                <li>Listagem de todos os funcionários.</li>
                <li>Busca de um funcionário por ID.</li>
                <li>Atualização dos dados de um funcionário.</li>
                <li>Remoção de um funcionário.</li>
            </ul>
        </li>
        <li>
            <strong>Módulo de Registro de Ponto:</strong>
            <ul>
                <li>Estrutura base para receber e armazenar os registros de ponto (entradas, saídas, etc.), com lógica de serviço para criação e listagem.</li>
            </ul>
        </li>
    </ul>

    <h2>🚀 Tecnologias Utilizadas</h2>
    <ul>
        <li><strong>Backend:</strong> <a href="https://nestjs.com/">NestJS</a>, <a href="https://www.typescriptlang.org/">TypeScript</a></li>
        <li><strong>Banco de Dados:</strong> <a href="https://www.mysql.com/">MySQL</a></li>
        <li><strong>ORM:</strong> <a href="https://typeorm.io/">TypeORM</a></li>
        <li><strong>Ambiente de Desenvolvimento:</strong> <a href="https://www.docker.com/">Docker</a>, <a href="https://docs.docker.com/compose/">Docker Compose</a></li>
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
    
    <h3>1. Clonar o Repositório</h3>
    <pre><code>git clone https://github.com/kaiqueav/tcc-test.git
cd tcc-test</code></pre>

    <h3>2. Verificar a Configuração</h3>
    <p>As credenciais do banco de dados estão configuradas diretamente nos seguintes arquivos. Certifique-se de que elas estão consistentes:</p>
    <ul>
        <li><code>docker-compose.yml</code>: Define o usuário e senha que o contêiner do MySQL irá criar.</li>
        <li><code>src/app.module.ts</code>: Define as credenciais que a aplicação NestJS usará para se conectar ao banco de dados.</li>
    </ul>
    <blockquote><strong>Nota de Segurança:</strong> Para ambientes de produção, é altamente recomendado mover essas credenciais para variáveis de ambiente usando o <code>ConfigModule</code> do NestJS.</blockquote>

    <h3>3. Iniciar o Banco de Dados com Docker</h3>
    <p>Este comando irá iniciar o contêiner do MySQL em segundo plano.</p>
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

    <h2>Endpoints da API Funcionais</h2>
    <p>A seguir estão os endpoints dos módulos principais que estão prontos para uso:</p>
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
                <td><code>GET</code></td>
                <td><code>/funcionarios/:id</code></td>
                <td>Busca um funcionário específico por ID.</td>
            </tr>
            <tr>
                <td><code>PATCH</code></td>
                <td><code>/funcionarios/:id</code></td>
                <td>Atualiza os dados de um funcionário.</td>
            </tr>
            <tr>
                <td><code>DELETE</code></td>
                <td><code>/funcionarios/:id</code></td>
                <td>Remove um funcionário.</td>
            </tr>
            <tr>
                <td><code>POST</code></td>
                <td><code>/registro-ponto</code></td>
                <td>Cria um novo registro de ponto.</td>
            </tr>
        </tbody>
    </table>
    <hr>
    
</body>
</html>