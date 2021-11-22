# Technical details

## naming conventions

### namespace

- Only lowercase alphanumeric characters and underscores are allowed.
- parts are divided by `-` in the url.
- parts are divided by `/` in the storage to have the virtual folder path well structured.


## Azure Storage as data storage

- We have one container for all autocomplete sources
- The namespace is the virtual path of the autocomplete source
- The property name is the name of the blob

### Sample

Pattern:`https://customerxy.blob.net/autocomplete/<tenantId>/<formId>/<propertyName>.autocomplete`
Sample URL: `https://customerxy.blob.net/autocomplete/4c70a337-b59a-4992-8fc2-c8b903ef3a80/aaa0a337-b59a-4992-8fc2-c8b903ef3a80/firstname.autocomplete`
