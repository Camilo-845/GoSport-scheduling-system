# Paso 1: Construcción de la aplicación Angular
FROM node:lts-alpine AS build

WORKDIR /usr/src/app

# Instalar las dependencias
# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
# Install dependencies
RUN npm install --silent

# Copiar todo el código fuente
COPY . .

# Generar los archivos de producción
# Build Angular application in PROD mode
RUN npm run build --prod

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy built Angular app files to Nginx HTML folder
COPY --from=build /usr/src/app/dist/client/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
