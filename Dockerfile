# Etapa de construcción
FROM node:14 as build

# Establecer el directorio de trabajo en la carpeta de la aplicación
WORKDIR /app

# Copiar los archivos de configuración y dependencias del proyecto
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación React
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos de compilación de la etapa de construcción a la carpeta de archivos estáticos de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80 para que la aplicación sea accesible desde el exterior
EXPOSE 80

# Comando para iniciar Nginx cuando se ejecute el contenedor
CMD ["nginx", "-g", "daemon off;"]
