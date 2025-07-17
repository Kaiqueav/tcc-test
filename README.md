 <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
            line-height: 1.6;
            color: #333;
            background-color: #f6f8fa;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1, h2, h3 {
            border-bottom: 2px solid #eaecef;
            padding-bottom: 10px;
            margin-top: 24px;
            margin-bottom: 16px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #dfe2e5;
            padding: 12px;
            text-align: left;
            vertical-align: top;
        }
        th {
            background-color: #f6f8fa;
            font-weight: 600;
        }
        code {
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
            background-color: #f6f8fa;
            padding: 0.2em 0.4em;
            margin: 0;
            font-size: 85%;
            border-radius: 6px;
        }
        pre {
            background-color: #f6f8fa;
            border-radius: 6px;
            padding: 16px;
            overflow: auto;
        }
        pre code {
            padding: 0;
            font-size: 100%;
        }
        .method {
            font-weight: bold;
            padding: 4px 8px;
            border-radius: 4px;
            color: #fff;
            text-align: center;
        }
        .post { background-color: #49cc90; }
        .get { background-color: #61affe; }
        .patch { background-color: #fca130; }
        .delete { background-color: #f93e3e; }
    </style>
</head>
<body>
    <div class="container">
        <h1>API de Controle de Ponto</h1>
        <p>Documentação completa das rotas da API para teste e integração. A URL base para todas as requisições é <code>http://localhost:3000</code>.</p>

        <h2>1. Funcionários</h2>
        <p>Endpoints para gerenciar os dados dos funcionários.</p>
        <table>
            <thead>
                <tr>
                    <th>Método</th>
                    <th>Rota</th>
                    <th>Descrição</th>
                    <th>Exemplo de Body (JSON)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="method post">POST</span></td>
                    <td><code>/funcionarios</code></td>
                    <td>Cria um novo funcionário.</td>
                    <td><pre><code>{
    "nome": "João Silva",
    "email": "joao.silva@example.com",
    "cpf": "12345678901",
    "admissao": "2024-01-15",
    "cargo": "Desenvolvedor",
    "carga_horaria": 40
}</code></pre></td>
                </tr>
                <tr>
                    <td><span class="method get">GET</span></td>
                    <td><code>/funcionarios</code></td>
                    <td>Lista todos os funcionários.</td>
                    <td>N/A</td>
                </tr>
                <tr>
                    <td><span class="method get">GET</span></td>
                    <td><code>/funcionarios/:id</code></td>
                    <td>Busca um funcionário pelo ID.</td>
                    <td>N/A</td>
                </tr>
                <tr>
                    <td><span class="method patch">PATCH</span></td>
                    <td><code>/funcionarios/:id</code></td>
                    <td>Atualiza dados de um funcionário.</td>
                    <td><pre><code>{
    "email": "novo.email@example.com"
}</code></pre></td>
                </tr>
                <tr>
                    <td><span class="method delete">DELETE</span></td>
                    <td><code>/funcionarios/:id</code></td>
                    <td>Remove um funcionário.</td>
                    <td>N/A</td>
                </tr>
            </tbody>
        </table>

        <h2>2. Registro de Ponto</h2>
        <p>Endpoints para registrar as batidas de ponto.</p>
        <table>
            <thead>
                <tr>
                    <th>Método</th>
                    <th>Rota</th>
                    <th>Descrição</th>
                    <th>Exemplo de Body (JSON)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><span class="method post">POST</span></td>
                    <td><code>/registro-ponto</code></td>
                    <td>Cria um novo registro de ponto.</td>
                    <td><pre><code>{
    "funcionarioId": 1,
    "registro": "2025-07-16T09:00:00Z",
    "tipo": "entrada"
}</code></pre></td>
                </tr>
                <tr>
                    <td><span class="method get">GET</span></td>
                    <td><code>/registro-p