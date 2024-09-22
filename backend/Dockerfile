# Etapa 1: Construir el backend
FROM golang:1.16.3-alpine3.13 AS backend-builder
WORKDIR /app
COPY . .
RUN go get -d -v ./...
RUN go build -o api .

# Etapa 2: Crear la imagen final
FROM alpine:3.13
WORKDIR /app

# Copiar el backend
COPY --from=backend-builder /app/api ./api

EXPOSE 8000

CMD ["./api"]