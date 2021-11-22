---
sidebar_position: 2
---

# Configuration

```yaml config.yml


resources:
  pubSub:
    # ...
  storageAccount:
    # ...
dataSources:
  - name: dataStorage
    type: azureStorageV2
    connectionString:
      - key: storageAccountConnectionString
  - name: cosmosDb
    type: azureCosmosDb
    connectionString:
      - key: cosmosDbConnectionString
exportCollections:
  - name: formData
    items:
      - name: pdfs
        dataSource: dataStorage
        config:
          containerName: form
      - name: dataItems
        dataSource: cosmosDb
        config:
          sqlQuery: SELECT * FROM dataItems WHERE dataItems.formId = @formId
    emailConfig:
      templateId: "<GUID>"
      cc:
        - it@wemogy.com
        - it@digittool.de
```


## E-Mail Templates

### Parameters

- `downloadUri`: The URI to download the exported data.
