# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto 3000 para el servidor de desarrollo
EXPOSE 3000

# Comando por defecto para iniciar la aplicación en modo de desarrollo
CMD ["npm", "start"]
