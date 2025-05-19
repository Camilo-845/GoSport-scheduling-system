# 🚀 Despliegue de Infraestructura y Aplicación GoSport en Azure con Terraform

## 📦 Requisitos Previos

- Tener instalado:
  - [Terraform](https://developer.hashicorp.com/terraform/install)
  - [Azure CLI](https://learn.microsoft.com/es-es/cli/azure/install-azure-cli)
  - [SSH](https://linux.die.net/man/1/ssh)
- Una cuenta de Azure con permisos para crear recursos.
- Una clave pública SSH generada y accesible localmente (`~/.ssh/id_rsa_terraform.pub`).
- Repositorio de aplicación alojado en GitHub.

---

## 🔐 1. Autenticarse en Azure

```bash
az login
az account set --subscription "<TU_ID_DE_SUSCRIPCIÓN>"
```

Puedes listar tus suscripciones con:

```bash
az account list --output table
```

---

## ⚙️ 2. Configurar variables

Edita o crea el archivo `terraform.tfvars` con el siguiente contenido:

```hcl
resource_group_name = "gosport-rg"
location            = "East US"
prefix              = "gosport"
admin_username      = "azureuser"
admin_password      = "UnaContraseñaSegura123!"
```

---

## 📁 3. Estructura de archivos

Asegúrate de tener una estructura similar a esta:

```
.
├── init.sh                  # Script de inicialización para la VM
├── main.tf                  # Infraestructura principal
├── outputs.tf               # Outputs como IP pública
├── terraform.tfvars         # Variables personalizadas
├── variables.tf             # Definición de variables
```

---

## 🏗️ 4. Desplegar Infraestructura

### Inicializar el proyecto

```bash
terraform init
```

### Previsualizar el plan de despliegue

```bash
terraform plan -out=tfplan
```

### Aplicar el plan

```bash
terraform apply tfplan
```

---

## 🌐 5. Conectarse por SSH a la VM

Obtén la IP pública exportada (o desde el portal de Azure):

```bash
terraform output public_ip_address
```

Conéctate:

```bash
ssh azureuser@<IP_PÚBLICA>
```

---

## 🔄 6. Provisionar aplicación automáticamente

La máquina virtual ejecuta el script `init.sh` al iniciarse:

---

## ⚠️ 7. Notas sobre `.env`

Dentro del contenedor se genera un archivo `.env` con la IP pública de la VM. Asegúrate de que `PUBLIC_IP` sea actualizado dinámicamente si cambias de IP o usas IP dinámica.

Ejemplo:

```env
PUBLIC_IP=20.121.184.56:8080
```

Puedes automatizarlo con `sed` en el script si deseas.

---

## ✅ 8. Verificación

Abre en el navegador:

```
http://<IP_PÚBLICA>
```

o prueba la API:

```bash
curl http://<IP_PÚBLICA>:8080/api/health
```

---

## 🧼 9. Destrucción de recursos

Para eliminar todo lo creado:

```bash
terraform destroy
```

---

## 📌 Autor

Desarrollado por Camilo Sarmiento – GoSport Cloud Infra
