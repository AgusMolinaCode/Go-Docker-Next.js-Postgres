# Etapa 1: Construir el backend
FROM golang:1.16.3-alpine3.13 AS backend-builder
WORKDIR /app
COPY backend/ .
RUN go get -d -v ./...
RUN go build -o api .

# Etapa 2: Construir el frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY frontend/ .
RUN npm install
RUN npm run build

# Etapa 3: Crear la imagen final
FROM alpine:3.13
WORKDIR /app

# Copiar el backend
COPY --from=backend-builder /app/api ./api

# Copiar el frontend
COPY --from=frontend-builder /app/.next ./frontend/.next
# COPY --from=frontend-builder /app/public ./frontend/public

# Instalar dependencias necesarias para servir el frontend
RUN apk add --no-cache nodejs npm

# Crear un script para servir el frontend
RUN echo 'const express = require("express");\nconst path = require("path");\nconst app = express();\napp.use(express.static(path.join(__dirname, "frontend/public")));\napp.get("*", (req, res) => {\n  res.sendFile(path.join(__dirname, "frontend/public", "index.html"));\n});\napp.listen(3000, () => {\n  console.log("Frontend running on port 3000");\n});' > server.js

EXPOSE 8000
EXPOSE 3000

CMD ["sh", "-c", "./api & node server.js"]