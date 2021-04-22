---
sidebar_position: 2
---

# Machine to Machine

You can use OAuth 2.0 to call one API from another one and secure the connection between those two. For this scenario, we can use the **Client Credentials Flow**.

The Client Credentials Flow uses a client's ID and Secret to request an Access Token from the identity service. As this flow is only executed in the backend and by clients that can hold secrets, we can create a client that has a secret for this flow.

The following scenarios should use the Machine to Machine setup:

- A service running on server is calling another API
- An IoT client with no user interface is calling an API

## Create a client

Each API or service that wants to call another one gets represented by its own client. To create a client for Machine to Machine communication, you can run the following command.

```bash
curl --request POST 'http://<ADMIN_ENDPOINT>/client' \
--header 'Content-Type: application/json' \
--data-raw '{
  "client_id": "<YOUR_CLIENT_ID>",
  "audience": [ "https://localhost:5001/" ],
  "grant_types": [ "client_credentials" ],
  "response_types": [ "token" ],
  "scope": "read:secrets",
  "client_type": "machine_to_machine"
}'
```

This will return the newly created client together with a secret. Please copy the secret to a secure place. You won't be able to retrieve it later.

:::danger Take care

This client has a secret which needs to be protected. Never use this client or its secret with Frontend applications like Native, Hybrid or Web Apps.

:::

## Retrieve an Access Token

Once the client has been created, you can call the `/token` endpoint to get an Access Token. For Machine To Machine clients, the endpoint expects **HTTP Basic Auth** with the Client ID as Username and the Client Secret as Password.

```bash
curl --request POST 'http://<PUBLIC_ENDPOINT>/oauth/token' \
--header 'Authorization: Basic bXktYXBpNDpUZUhWVk05WEZ0MFhQLWNCZzRBdzBwUjN1eA==' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'scope=read:secrets' \
--data-urlencode 'audience=https://localhost:5001/'
```
