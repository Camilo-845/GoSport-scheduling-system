#!/bin/bash

# Cargar variables de entorno del .env si existe
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Validar que la variable esté definida
if [ -z "$PUBLIC_IP" ]; then
  echo "❌ PUBLIC_IP no está definida en el entorno"
  exit 1
fi

# Reemplazar y guardar como config.json
sed "s|__API_HOST__|$PUBLIC_IP|g" ./client/config.template.json >./client/public/assets/config.json

echo "✅ config.json generado con IP $PUBLIC_IP"
