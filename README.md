## API-DB & API-Gateway & Frontend

### Copiar .env.example a .env

```bash
cp .env.example .env
```

### Docker

### Iniciar contenedores

```bash

docker-compose up -d --build

```

## nota: las migraciones se ejecutan en el contenedor api-db al momento de iniciar el contenedor debido a que es un modo de desarrollo y prueba
