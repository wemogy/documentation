# wemogy Identity

## Multi-Tenancy

- Each tenant gets its own deployment of ORY Kratos
- Each tenant gets its own deployment of ORY Hydra
- Each tenant gets its own deployment of wemogy.Identity server
- Each tenant gets its own databases in the Azure Database for PostgreSQL server

### Add a new tenant

```
CREATE DATABASE new_tenant_ory_kratos;
CREATE DATABASE new_tenant_ory_hydra;
CREATE ROLE new_tenant WITH NOINHERIT LOGIN PASSWORD '...';
GRANT ALL ON DATABASE new_tenant_ory_kratos to new_tenant;
GRANT ALL ON DATABASE new_tenant_ory_hydra to new_tenant;
```

Create a Connection String for the new tenant

```
postgresql://new_tenant@<DATABASE_SERVER>:<PASSWORD>@<DATABASE_SERVER_URL>/new_tenant_ory_kratos
```
