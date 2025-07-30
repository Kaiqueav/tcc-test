# Dockerfile

# Usa uma imagem base do Node.js
FROM node:18-alpine

RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont
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