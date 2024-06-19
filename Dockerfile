# Usa una imagen base con Node.js
FROM node:18.20.2

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe) para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install
RUN npm update

# Copia los archivos de las carpetas public y src al directorio de trabajo dentro del contenedor
COPY public ./public
COPY src ./src

# Expone el puerto 3000 para que la aplicación React sea accesible desde el exterior
EXPOSE 3000

# Comando para iniciar la aplicación en modo de desarrollo, escuchando en todas las interfaces de red
CMD ["sh", "-c", "npm start -- --host 0.0.0.0"]
