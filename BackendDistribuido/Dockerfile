# Imagen base con Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Instala TypeScript y ts-node globalmente (si lo usas para ejecutar directamente TS)
RUN npm install -g ts-node typescript

# Copia el resto del código
COPY . .

# Expone el puerto de tu backend
EXPOSE 3000

# Comando para ejecutar el backend con ts-node
CMD ["ts-node", "src/index.ts"]
