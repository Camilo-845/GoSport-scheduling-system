
output "public_ip_address" {
  description = "Dirección IP pública de la VM"
  value       = azurerm_public_ip.public_ip.ip_address
}
