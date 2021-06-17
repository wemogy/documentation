---
sidebar_position: 5
---


# Configuration

## Require E-Mail confirmation

You can choose between making E-Mail confirmation required or optional. If optional, a user gets immediately logged in, after successful registration. Otherwise, the E-Mail address has to be confirmed first.

You can configure required E-Mail confirmation in the Helm Chart values.

```yaml title="values.yaml"
config:
  emailVerificationRequired: false
```

## Web Hooks

You can call other systems via Web Hooks to notify them about events that happened inside wemogy Identity. All Web Hooks are `POST` requests. Make sure, that your system provides and endpoint that accepts the Web Hook with the according body.

:::caution Warning
Make sure, that your system does not rely on these webhooks. Whenever a user registered and your system that should get notified by the Web Hook is not available, the Web Hook call will not be retried.
:::

### After registration

This Web Hook gets triggered, whenever a new user registered successfully. It contains a body including the ID of the new user. To register a Web Hook upon successful user registration, add the following configuration to the Helm Chart:

```yaml title="values.yaml"
config:
  afterRegistrationHook:
    uri: https://...
    header: # Optional, for authentication
      name: abc
      value: xyz
```

The Web Hook gets called with the following body:

```json
{
  "id": "<ID_OF_THE_NEW_USER>"
}
```
