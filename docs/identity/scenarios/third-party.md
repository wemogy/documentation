---
sidebar_position: 3
---

# Third Party App

TBD...

## Create a client

```bash
curl --request POST 'http://<ADMIN_ENDPOINT>/client' \
--header 'Content-Type: application/json' \
--data-raw '{
  "client_id": "<YOUR_CLIENT_ID>",
  "audience": [ "https://localhost:5001/" ],
  "grant_types": [ "authorization_code", "refresh_token" ],
  "response_types": [ "code" ],
  "scope": "read:secrets openid offline_access",
  "redirect_uris": [ "<YOUR_DOMAIN>/callback" ],
  "client_type": "frontend"
}'
```
