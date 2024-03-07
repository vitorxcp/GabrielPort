# Use uma imagem base que tenha o Node.js instalado
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm i

# Copie todo o código-fonte para o diretório de trabalho do contêiner
COPY . .

# Exponha a porta em que o aplicativo será executado
EXPOSE 80

# Comando para iniciar o aplicativo quando o contêiner for iniciado
CMD ["node", "server.js"]