# resource "azurerm_resource_group" "eshop_resource_group" {
#   name     = "eshop_resource_group"
#   location = "West Europe"
# }

resource "azurerm_servicebus_namespace" "eshop-servicebus" {
  name                = "eshop-servicebus-a22"
  location            = azurerm_resource_group.eshop_resource_group.location
  resource_group_name = azurerm_resource_group.eshop_resource_group.name
  sku                 = "Standard"
}

resource "azurerm_servicebus_queue" "cart_queue" {
  name                = "cart_queue"
  namespace_id      = azurerm_servicebus_namespace.eshop-servicebus.id
}

resource "azurerm_servicebus_queue" "order_queue" {
  name                = "order_queue"
  namespace_id      = azurerm_servicebus_namespace.eshop-servicebus.id
}