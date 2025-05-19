
variable "resource_group_name" {
  description = "Nombre del grupo de recursos"
  type        = string
}

variable "location" {
  description = "Ubicación de los recursos"
  type        = string
  default     = "East US"
}

variable "prefix" {
  description = "Prefijo para nombrar los recursos"
  type        = string
}

variable "admin_username" {
  description = "Nombre de usuario para la VM"
  type        = string
}

variable "admin_password" {
  description = "Contraseña para la VM"
  type        = string
  sensitive   = true
}
