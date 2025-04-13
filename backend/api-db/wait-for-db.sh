#!/bin/sh

set -e

echo "Esperando a que la base de datos esté lista..."

# Parámetros de conexión
HOST="wallet-db"
PORT="3306"
USER="root"
PASSWORD="root"

# Número máximo de intentos
MAX_ATTEMPTS=30
ATTEMPT=0

# Esperar a que la base de datos esté disponible
until mysqladmin ping -h "$HOST" -P "$PORT" -u "$USER" -p"$PASSWORD" --silent; do
  ATTEMPT=$((ATTEMPT+1))
  if [ $ATTEMPT -ge $MAX_ATTEMPTS ]; then
    echo "Error: No se pudo conectar a la base de datos después de $MAX_ATTEMPTS intentos. Abortando."
    exit 1
  fi
  echo "La base de datos aún no está lista. Intento $ATTEMPT/$MAX_ATTEMPTS. Reintentando en 2 segundos..."
  sleep 2
done

echo "Base de datos lista. Ejecutando migraciones..."



# Ejecutar migraciones
npx prisma migrate deploy

# Generar e instalar Prisma client
npx prisma generate

echo "Iniciando la aplicación..."
exec npm start
