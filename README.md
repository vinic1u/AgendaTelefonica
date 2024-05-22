
# Agenda Telefonica

Uma aplicação de back-end de um CRUD para uma agenda telefônica utilizando Node.js e Express.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`SECRET` **(Token para HashSync)**

`DATABASE_URL` **(Recomendo Utilizar : "file:dev.db")**

`PORT` **(Porta para o server rodar)**
## Instalação

Instalar as Depedências Necessarias

```bash
  npm i
```

Inicializar o Prisma e o Banco de DADOS

```bash
  npx prisma migrate dev --name "iniciando projeto"
```
    

    
## Inicializando

```bash
  npm run dev
```