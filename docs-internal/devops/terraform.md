# Terraform

We use Terraform as our preferred *Infrastructure as Code* technology.

## Best practices

### Store the State in Remote Backends

Remote Backend can store the Terraform State centralized and allow multiple users to work with the same Terraform based infrastructure. They can also ensure, that the State is locked while one Terraform script is processing to avoid concurrency and conflicts. We use [Azure Storage Accounts as a Terraform Backend](https://docs.microsoft.com/en-us/azure/terraform/terraform-backend) by default.

Create an Azure Storage Account.

```bash
az storage account create \
  --name <PROJECT_NAME> \
  --resource-group terraform \
  --location westeurope \
  --kind StorageV2
```

Add a Blob Container for the Terraform State.

```bash
az storage container create \
  --name tfstate \
  --account-name <PROJECT_NAME>
```

Point Terraform to the Remote State.

```hcl title="main.tf"
terraform {
  backend "azurerm" {
    subscription_id      = "00000000-0000-0000-0000-000000000000"
    tenant_id            = "00000000-0000-0000-0000-000000000000"
    resource_group_name  = "terraform"
    storage_account_name = "<PROJECT_NAME>"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}
```

Authenticate against the state before running `terraform init`.

```bash
export ARM_ACCESS_KEY=$(az storage account keys list -g terraform --account-name <PROJECT_NAME> -o tsv --query "[0].value")
```

### Random names

Many resources require a globally unique name. Terraform can generate random strings that help you to create names with a random id attached to them.

```hcl title="variables.tf"
variable "name" {
  description = "Name that should be prepended to every resource"
  type        = string
  default     = "subscriptions"
}

resource "random_id" "id" {
  byte_length = 4
}

locals {
  prefix = "${var.name}${random_id.id.hex}"
}
```

```hcl title="azure_cosmos_db.tf"
resource "azurerm_cosmosdb_account" "default" {
  name = "${local.prefix}db"	# <- Use random prefix here
}
```

### Prevent-Destory Hooks

Sometimes small changes in a Terraform Script, can require Terraform to destroy and re-create a resource. This can be easily overlooked in `terraform plan` and can be source of mistakes. Especially those resources that hold state like Databases should not be able to be re-created automatically, as this often means data-loss.

[Lifecycle Hooks in Terraform](https://www.terraform.io/docs/language/meta-arguments/lifecycle.html) can help to mark Resources as not destroyable, so Terraform can't delete them and throws an error if deletion is required.

Add this block to each resource you can't afford to lose.

```hcl
lifecycle {
  prevent_destroy = true
}
```
