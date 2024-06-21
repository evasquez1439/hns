# Etapa de compilación
FROM node:14 as builder

WORKDIR /app

# Copiar el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instalar las dependencias del proyecto
#RUN npm ci

# Copiar el resto de los archivos del proyecto
COPY . .

# Autenticarse en el repositorio privado
# RUN apt-get update && apt-get install -y git
# RUN git config --global advice.detachedHead false
# RUN git clone --single-branch --branch developer "https://oauth2:glpat-an1gPAYSm3m1iyzgRno1@gitlab.com/interoperabilidad_sw/helena-frontend.git" 



# Compilar el proyecto Angular
# RUN npm run build

# Etapa de producción
FROM nginx:alpine as production-stage


# Copiar los archivos de compilación desde la etapa anterior
# COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar los archivos de compilación desde la etapa anterior
COPY  /dist /usr/share/nginx/html


COPY default.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 80


# Comando para iniciar el servidor nginx
CMD ["nginx", "-g", "daemon off;"]


