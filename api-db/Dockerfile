FROM node:18

# Instalar herramientas de cliente MySQL
RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Dar permisos de ejecución al script
RUN chmod +x wait-for-db.sh

EXPOSE 3001

CMD ["./wait-for-db.sh"]
