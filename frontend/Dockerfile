# Etapa 1: Construir el frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: Servir el frontend
FROM node:18-alpine
WORKDIR /app

# Copiar los archivos necesarios desde la etapa de construcción
COPY --from=frontend-builder /app/.next/standalone ./
COPY --from=frontend-builder /app/.next/static ./.next/static
# COPY --from=frontend-builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]