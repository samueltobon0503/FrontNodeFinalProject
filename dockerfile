# Etapa 1: Build
# Usamos la versión 20 (LTS) que es la más recomendada para Angular
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
# Instalamos dependencias ignorando conflictos de versiones
RUN npm install --legacy-peer-deps

COPY . .

# Ejecutamos el build nativo de Angular
# Nota: Quitamos el 'npx' y usamos el script del package.json directamente
RUN npm run build -- --configuration production

# Etapa 2: Servidor
FROM nginx:alpine
# Tu ruta según la imagen de VS Code anterior
COPY --from=build /app/dist/PFA_front /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
