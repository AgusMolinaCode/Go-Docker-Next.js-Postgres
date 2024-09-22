# Proyecto Fullstack con Next.js, Tailwind, Zod, Go y PostgreSQL

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)

Este es un proyecto fullstack simple que utiliza Next.js para el frontend, Tailwind CSS para el diseño, Zod para la validación de formularios, una API desarrollada en Go y PostgreSQL como base de datos. Todo el proyecto está dockerizado y desplegado en Railway.

## Tecnologías Utilizadas

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Zod](https://github.com/colinhacks/zod)
- **Backend**: [Go](https://golang.org/)
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/)
- **Contenedores**: [Docker](https://www.docker.com/)
- **Despliegue**: [Railway](https://railway.app/)

## Ejecución Local

### Paso 1: Ejecutar los Contenedores

1. **Navega a la raíz del proyecto**: Abre una terminal y navega al directorio raíz de tu proyecto donde se encuentra el archivo `docker-compose.yml`.

    ```sh
    cd /ruta/a/tu/proyecto
    ```

2. **Construir y ejecutar los contenedores**: Usa Docker Compose para construir y ejecutar los contenedores.

    ```sh
    docker-compose up --build
    ```

    ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

    Este comando hará lo siguiente:
    - Construirá las imágenes de Docker para el backend y el frontend.
    - Creará y ejecutará los contenedores para la base de datos PostgreSQL, el backend y el frontend.
    - Expondrá los puertos 5432 (PostgreSQL), 8000 (backend) y 3000 (frontend) en tu máquina local.

3. **Verificar la ejecución**: Una vez que los contenedores estén en ejecución, puedes verificar que todo esté funcionando correctamente.

    - **Backend**: Accede a `http://localhost:8000` para verificar que el backend esté funcionando.
    
        ![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)

    - **Frontend**: Accede a `http://localhost:3000` para verificar que el frontend esté funcionando.
    
        ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
        ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Paso 2: Detener los Contenedores

Para detener y eliminar los contenedores, usa el siguiente comando:

```sh
docker-compose down
