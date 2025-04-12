# Backend

## API-DB & API-Gateway

### Docker

### Iniciar contenedores para los servicios de base de datos y rest

```bash

docker-compose up -d --build

```

### Ejecutar migraciones

```bash

npx prisma migrate deploy
npx prisma generate

```
