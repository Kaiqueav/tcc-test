# Dockerfile

# Passo 1: Usar uma imagem base Debian (slim) que é mais compatível com o Puppeteer
FROM node:18-slim

# Passo 2: Instalar as dependências necessárias para o Chromium em Debian
# Fonte: Documentação oficial do Puppeteer
RUN apt-get update \
    && apt-get install -yq --no-install-recommends \
    chromium \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    fonts-freefont-ttf \
    libxss1 \
    --fix-missing

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o resto do código do projeto
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "start:dev"]