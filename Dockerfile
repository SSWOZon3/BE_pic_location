# Utiliza la imagen base oficial de Node.js
FROM node:20.9.0

# Crea un directorio para la aplicación
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# Instala las dependencias de la aplicación
# Un asterisco (*) se utiliza para asegurar que tanto package.json como package-lock.json sean copiados
COPY package.json /usr/src/app/
RUN npm install

# Copia los archivos del proyecto
COPY . /usr/src/app

# Expone el puerto en el que tu aplicación estará escuchando
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]
