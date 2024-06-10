# Usar la imagen oficial de Node.js
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Instalar específicamente la versión de fontawesome-svg-core requerida
RUN npm install @fortawesome/fontawesome-svg-core@latest

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que usa la aplicación React en desarrollo (por defecto 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
