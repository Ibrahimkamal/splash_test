resource "azurerm_eventhub_namespace" "eshop_eventhub_ns" {
    name                = "eshop-eventhub-ns"
    location            = "eastus"
    resource_group_name = azurerm_resource_group.eshop_resource_group.name
    sku                 = "Standard"
    capacity            = 1
}

resource "azurerm_eventhub" "eshop_eventhub" {
    name                = "eshop-eventhub"
    namespace_name      = azurerm_eventhub_namespace.eshop_eventhub_ns.name
    resource_group_name = azurerm_resource_group.eshop_resource_group.name
    partition_count     = 2
    message_retention   = 1
}
