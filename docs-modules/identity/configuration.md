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

## Identity schema

The identity schema describes, which data gets stored for each identity and what gets requested upon new registrations. The schema is described in JSON and uses the [JSON Schema](https://json-schema.org/) standard to describe the data format.

Currently, we only support one single schema for all identities.

Below, you can find an example, which asks for E-Mail Address, Name (constisting of first- and lastname), and organization name and a confirmation of the privacy policy (as a boolean).

```json
{
  "$id": "https://schemas.ory.sh/presets/kratos/quickstart/email-password/identity.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Person",
  "type": "object",
  "properties": {
    "traits": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email",
          "title": "E-Mail",
          "minLength": 3,
          "ory.sh/kratos": {
            "credentials": {
              "password": {
                "identifier": true
              }
            },
            "verification": {
              "via": "email"
            },
            "recovery": {
              "via": "email"
            }
          }
        },
        "name": {
          "type": "object",
          "properties": {
            "first": {
              "title": "First Name",
              "type": "string"
            },
            "last": {
              "title": "Last Name",
              "type": "string"
            }
          }
        },
        "organization": {
          "type": "object",
          "properties": {
            "name": {
              "title": "Organization name",
              "type": "string"
            }
          }
        },
        "privacyPolicy": {
          "type": "boolean",
          "title": "Accept our privacy policy"
        }
      },
      "required": [
        "email",
        "privacyPolicy"
      ],
      "additionalProperties": false
    }
  }
}
```


You can configure the identity schema in the Helm Chart values.

```yaml title="values.yaml"
config:
  identitySchema: |
    {
      # ...
    }
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
