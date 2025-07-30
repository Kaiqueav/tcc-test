Sistema de Controle de Ponto - API
API para um sistema de controle de ponto, desenvolvida com NestJS e TypeORM. O projeto oferece uma base sólida para gerenciamento de funcionários e registro de ponto, utilizando um ambiente de desenvolvimento conteinerizado com Docker.

✨ Funcionalidades Implementadas
Atualmente, o sistema conta com as seguintes funcionalidades:

Módulo de Funcionários:

Cadastro de novos funcionários.

Listagem de todos os funcionários.

Busca de um funcionário por ID.

Atualização dos dados de um funcionário.

Remoção de um funcionário.

Módulo de Registro de Ponto:

Estrutura para receber e armazenar os registros de ponto (entradas, saídas, etc.).

Lógica de serviço para criação e listagem de registros, com validação de existência do funcionário.

🚀 Tecnologias Utilizadas
Backend: NestJS, TypeScript

Banco de Dados: MySQL

ORM: TypeORM

Ambiente de Desenvolvimento: Docker, Docker Compose

Validação: class-validator, class-transformer

📋 Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina:

Node.js (v16 ou superior)

npm ou Yarn

Docker e Docker Compose

⚙️ Como Rodar o Projeto
Siga os passos abaixo para executar a aplicação localmente.

1. Clonar o Repositório
```bash
git clone [https://github.com/kaiqueav/tcc-test.git](https://github.com/kaiqueav/tcc-test.git)
```
cd tcc-test

2. Verificar a Configuração
As credenciais do banco de dados estão configuradas diretamente nos seguintes arquivos. Certifique-se de que elas estão consistentes:

# Docker-compose.yml: 
Define o usuário e senha que o contêiner do MySQL irá criar.

# Src/app.module.ts: 
Define as credenciais que a aplicação NestJS usará para se conectar ao banco de dados.

Nota de Segurança: Para ambientes de produção, é altamente recomendado mover essas credenciais para variáveis de ambiente usando o ConfigModule do NestJS.

3. Iniciar o Banco de Dados com Docker
Este comando irá iniciar o contêiner do MySQL em segundo plano.
```bash
docker-compose up -d
```
4. Instalar as Dependências
``` bash
npm install
```
5. Rodar a Aplicação
Este comando inicia o servidor em modo de desenvolvimento com hot-reload.
```bash
npm run start:dev
```

A aplicação estará disponível em:  http://localhost:3000.

Scripts Disponíveis
npm run start:dev: Inicia a aplicação em modo de desenvolvimento.

npm run build: Compila o código TypeScript para JavaScript.

npm run start:prod: Inicia a aplicação em modo de produção (após o build).

npm run lint: Executa o linter para verificar a qualidade do código.

npm run test: Roda os testes unitários.

npm run test:e2e: Roda os testes de ponta a ponta (end-to-end).

npm run test:cov: Roda os testes e gera um relatório de cobertura.

Endpoints da API
A seguir estão todas as rotas implementadas nos controladores do projeto.

Módulo de Funcionários (/funcionarios)
Método

|Rota | Descrição
|--------- |-------------|
POST /funcionarios| Cria um novo funcionário.
|GET /funcionarios| Lista todos os funcionários.
GET /funcionarios/:id| Busca um funcionário específico por ID. 
PATCH /funcionarios/:id | Atualiza os dados de um funcionário.
DELETE/funcionarios/:id|Remove um funcionário.

Módulo de Registro de Ponto (/registro-ponto)
O RegistroPontoController está estruturado, mas as rotas ainda precisam ser adicionadas. Com base no serviço existente, as seguintes rotas podem ser ativadas:

Método

Rota

Descrição

Status

POST

/registro-ponto

Cria um novo registro de ponto.

Implementar no Controller

GET

/registro-ponto

Lista todos os registros de ponto.

Implementar no Controller

