#!/bin/bash
set -e

# Add Docker's official GPG key:
apt-get update
apt-get install -y ca-certificates curl
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" |
  tee /etc/apt/sources.list.d/docker.list >/dev/null
apt-get update

apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# ----------------------------------------
# Obtener IP pública
# ----------------------------------------
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)

# ----------------------------------------
# Clonar el proyecto
# ----------------------------------------
git clone https://github.com/Camilo-845/GoSport-scheduling-system.git /home/azureuser/app
cd /home/azureuser/app

# ----------------------------------------
# Crear archivo .env
# ----------------------------------------
cat <<EOF >.env
# Database
DB_CONTAINER_NAME=gosport_db
DB_USER=gosport_user
DB_PASSWORD=gosport_password
DB_NAME=gosport_db
DB_PORT_INTERNAL=5432
DB_HOST=postgres

# API
API_CONTAINER_NAME=gosport_api
API_PORT_EXTERNAL=8080
API_PORT_INTERNAL=8080

# Client
CLIENT_CONTAINER_NAME=gosport_client
CLIENT_PORT_EXTERNAL=80

# Servidor
PUBLIC_IP=$PUBLIC_IP:8080
EOF

# ----------------------------------------
# Ejecutar despliegue
# ----------------------------------------
chmod +x ./scripts/generate-config.sh
./scripts/generate-config.sh

docker compose up -d --build
