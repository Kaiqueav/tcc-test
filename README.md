# PontoCloud - Sistema de Controle de Ponto (Full Stack)

## 📖 Descrição

O **PontoCloud** é um sistema de software full stack para web, desenvolvido para o gerenciamento e controle de ponto de funcionários. A solução é composta por duas partes principais:

1.  **API Backend ([tcc-test](https://github.com/kaiqueav/tcc-test)):** Uma API robusta construída com **NestJS** e **TypeORM**, responsável por toda a lógica de negócios, gerenciamento de dados e autenticação.
2.  **Aplicação Frontend ([Software](https://github.com/Kaiqueav/Software)):** Uma interface de cliente desenvolvida com **HTML, TailwindCSS e JavaScript puro**, que consome a API para fornecer uma experiência de usuário interativa para administradores e funcionários.

O projeto utiliza um ambiente de desenvolvimento conteinerizado com Docker para o banco de dados MySQL, facilitando a configuração e a execução do sistema completo.

## ✨ Funcionalidades Principais

* **Autenticação Segura:** Sistema de login baseado em JWT para dois tipos de perfis:
    * **Administradores:** Acesso total ao sistema.
    * **Funcionários:** Acesso restrito para registro de ponto via CPF.
* **Painel de Controle do Administrador:**
    * Dashboard com visão geral dos últimos registros.
    * CRUD completo para **Funcionários**.
    * CRUD para **Horários de Trabalho** e **Intervalos** por funcionário.
    * Registro manual de ponto para qualquer funcionário.
* **Banco de Horas:** Cálculo e consulta do saldo de horas de cada funcionário.
* **Geração de Relatórios:** Emissão de **Espelho de Ponto** em formato JSON e download em **PDF**.

## 💻 Arquitetura e Tecnologias

### Backend (API)

* **Framework:** NestJS, TypeScript
* **Banco de Dados:** MySQL (gerenciado via Docker)
* **ORM:** TypeORM
* **Autenticação:** Passport.js (Estratégias JWT)
* **Geração de PDF:** Puppeteer
* **Validação:** class-validator, class-transformer

### Frontend (Cliente)

* **Estrutura:** HTML5
* **Estilização:** TailwindCSS
* **Lógica:** JavaScript (ES6+)
* **Ícones:** Font Awesome

## 🚀 Como Executar o Projeto Completo

Para executar a solução completa, você precisará ter o backend (API) e o frontend rodando simultaneamente.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (v16 ou superior)
* [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/)

### Passo 1: Configurar e Rodar o Backend (API)

1.  **Clone o repositório do backend:**
    ```bash
    git clone [https://github.com/kaiqueav/tcc-test.git](https://github.com/kaiqueav/tcc-test.git)
    cd tcc-test
    ```

2.  **Crie o arquivo de variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto `tcc-test` e adicione o seguinte conteúdo. A senha do banco de dados deve ser a mesma definida em `docker-compose.yml`.

    ```env
    # .env
    DB_HOST=mysql_db
    DB_PORT=3306
    DB_USERNAME=myuser
    DB_PASSWORD=minhapassword
    DB_DATABASE=controle_ponto
    JWT_SECRET=sua_chave_secreta_aqui 
    ```

3.  **Inicie os contêineres do Backend:**
    Este comando irá construir a imagem da aplicação (se necessário) e iniciar os contêineres do backend e do banco de dados em segundo plano.
    ```bash
    docker-compose up --build -d
    ```

    A API estará em execução em `http://localhost:3000`.

### Passo 2: Configurar e Rodar o Frontend

1.  **Clone o repositório do frontend em uma pasta separada:**
    ```bash
    git clone [https://github.com/Kaiqueav/Software.git](https://github.com/Kaiqueav/Software.git)
    cd Software
    ```

2.  **Verifique a URL da API:**
    Abra o arquivo `script.js` e certifique-se de que a constante `API_URL` está apontando para o endereço do seu backend em execução.
    ```javascript
    // script.js
    const API_URL = 'http://localhost:3000';
    ```

3.  **Execute o frontend:**
    Não é necessário um servidor web complexo. Basta abrir o arquivo `index.html` diretamente no seu navegador.

    > **Pronto!** Agora você pode interagir com a aplicação. Crie um administrador, cadastre funcionários e registre pontos.

## 🔑 Endpoints da API

A seguir estão todas as rotas implementadas na API. Rotas protegidas exigem um token JWT no cabeçalho `Authorization: Bearer <token>`.

---

### Módulo de Autenticação (`/auth`)

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `POST` | `/login` | Autentica um administrador com email e senha. | Não |
| `POST` | `/ponto/login` | Autentica um funcionário com CPF para registro de ponto. | Não |

---

### Módulo de Administradores (`/admin`)

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Cria um novo administrador. | Sim (Admin) |

---

### Módulo de Funcionários (`/funcionarios`)

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Cria um novo funcionário. | Sim (Admin) |
| `GET` | `/` | Lista todos os funcionários. | Sim (Admin) |
| `GET` | `/:id` | Busca um funcionário específico por ID. | Sim (Admin) |
| `PATCH`| `/:id` | Atualiza os dados de um funcionário. | Sim (Admin) |
| `DELETE`| `/:id`| Remove um funcionário. | Sim (Admin) |

---

### Módulo de Registro de Ponto (`/registro-ponto`)

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Cria um novo registro de ponto. Admins podem registrar para outros; funcionários apenas para si mesmos. | Sim (Todos) |
| `GET` | `/` | Lista todos os registros de ponto. | Sim (Admin) |
| `GET` | `/funcionario/:id` | Lista todos os registros de um funcionário específico. | Sim (Admin) |
| `GET` | `/:id` | Busca um registro de ponto por ID. | Sim (Admin) |
| `PATCH`| `/:id` | Atualiza um registro de ponto. | Sim (Admin) |
| `DELETE`| `/:id`| Remove um registro de ponto. | Sim (Admin) |

---

### Módulo de Horário de Trabalho (`/horario-trabalho`)

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Define um novo horário de trabalho para um funcionário. | Sim (Admin) |
| `GET` | `/funcionario/:id` | Lista todos os horários de trabalho de um funcionário. | Sim (Admin) |
| `PATCH`| `/:id` | Atualiza um horário de trabalho. | Sim (Admin) |
| `DELETE`| `/:id`| Remove um horário de trabalho. | Sim (Admin) |

---

### Módulo de Horário de Intervalo (`/horario-intervalo`)

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Define um novo horário de intervalo para um funcionário. | Sim (Admin) |
| `GET` | `/funcionario/:id` | Lista todos os horários de intervalo de um funcionário. | Sim (Admin) |
| `PATCH`| `/:id` | Atualiza um horário de intervalo. | Sim (Admin) |
| `DELETE`| `/:id`| Remove um horário de intervalo. | Sim (Admin) |

---

### Módulo de Banco de Horas (`/banco-horas`)

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `GET` | `/funcionario/:id` | Consulta o saldo do banco de horas de um funcionário. | Sim (Admin) |
| `POST`| `/calcular/funcionario/:id`| Dispara o cálculo do banco de horas para um funcionário em um período. | Sim (Admin) |

---

### Módulo de Relatórios (`/relatorios`)

| Método | Rota | Descrição | Protegida |
| :--- | :--- | :--- | :--- |
| `GET` | `/espelho-ponto/funcionario/:id` | Gera os dados do espelho de ponto em JSON. Requer query params `ano` e `mes`. | Sim (Admin) |
| `GET` | `/espelho-ponto/funcionario/:id/pdf`| Gera o espelho de ponto em um arquivo PDF. Requer query params `ano` e `mes`. | Sim (Admin) |
