---
sidebar_position: 1
---

# Subscriptions

TBD...

## Integration Tests

TBD...

```bash
# Create a Resource Group
az group create -n terraform -l westeurope

# Create Storage Account
az storage account create \
  --name wemogyintegrationtesttf \
  --resource-group terraform \
  --location westeurope \
  --kind StorageV2
```
