# Usar la imagen oficial de Node.js
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar las dependencias del proyecto
COPY package*.json ./
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que usa la aplicación React en desarrollo (por defecto 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
