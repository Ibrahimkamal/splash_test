resource "azurerm_mongodb_account" "eshop-mongodb" {
    name                = "eshop-mongodb"
    resource_group_name = "eshop_resource_group"
    location            = "westeurope"
    offer               = "Standard"
    kind                = "MongoDB"
    version             = "3.6"
}
