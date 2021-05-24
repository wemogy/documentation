---
sidebar_position: 2
---

# Components

TBD...

## Model

`IModel`

TBD...

## Client

TBD...

## Context

`IContext`

TBD...

## Environment

Consolidates client and context

`IEnvironment`

TBD...

## Validators

TBD...

## Database Service

`IDatabaseService`

TBD...

### Filters

Filters can restrict access to specific elements based on the Context or your custom logic. This can be useful, if you want users to only access their own items or if you work with multi-tenancy and want to restrict users to only access items from their tenant.

#### General Get Filter

The `GeneralGetFilter` filters which items can be read in the current Context.

:::info Important

The `GeneralGetFilter` only gets applied to **Read operations** and will not filter, if a user is allowed to update or delete an object. Please use the [Authorize hooks](#authorize) to check if a user is allowed to trigger those operations.

:::

##### Example

```csharp
protected override Task<Expression<Func<Subscription, bool>>> GeneralGetFilter()
{
    // Ensures, that only items from the current tenant can be read
    // TODO: Check, if user is allowed to see this Tenant
    return Task.FromResult<Expression<Func<Subscription, bool>>>(x => x.TenantId == Context.ActiveTenantId);
}
```

### Hooks

The Database Service uses hooks to let you add custom logic to the most important steps. The hooks will be called in a specific order. Some of them are mandatory to override. The following hooks are called in the order below.

1. Authorize (required)
1. Validation
1. Before operation
1. After operation

#### Authorize


#### Validation

Describe Hooks...

### Testing

TBD...
