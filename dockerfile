# Etapa 1: Construir a aplicação
FROM node:14-alpine AS builder
ENV NODE_ENV build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Executar a aplicação
FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
EXPOSE 3004
CMD ["npm", "run", "start:prod"]