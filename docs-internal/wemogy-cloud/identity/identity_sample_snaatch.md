# Identity sample snaatch

In this sample we setup the identity server for the application domain `https://...snaatch.com`.
We can develop against the local frontend using the identity server in the cloud kubernetes cluster.

## Check health

For Hydra: <https://auth.snaatch.com/issuer/health/alive>

For Kratos: <https://auth.snaatch.com/kratos/health/alive>

## Create a client

1. Forward the Admin API to have the ADMIN_ENDPOINT `http://localhost:7000` available.

    ```bash
    kubectl port-forward svc/wemogy-identity-server-admin 7000:80
    ```

2. Create the client

    The client ID is the name of the frontend app!

    ```bash
    curl --request POST 'http://localhost:7000/client' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "client_id": "snaatch_app",
      "audience": [ "https://localhost:5001/" ],
      "grant_types": [ "authorization_code", "refresh_token" ],
      "response_types": [ "code" ],
      "scope": "read:secrets offline_access",
      "redirect_uris": [ "https://auth.snaatch.com/callback" ],
      "client_type": "frontend"
    }'
    ```

## Setting up the frontend

### Setup SSL for local testing of the domain

1. Create the `.cert` folder and a new SSL certificate using mkcert

    ```bash
    mkdir -p .cert && mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "poc.snaatch.com"
    ```

2. Add the SSL start option to the `package.json`

    ```json
    {
      "ssl": "HTTPS=true HOST=poc.snaatch.com PORT=443 SSL_CRT_FILE=./.cert/cert.pem SSL_KEY_FILE=./.cert/key.pem react-scripts start"
    }
    ```

3. Run the SSL application as sudo (because of the used port)

    ```bash
    sudo yarn ssl
    ```

4. Redirect the domain to localhost using the `hosts` file

    ```bash
    code /etc/hosts
    ```

    Add the redirect rule and save. On failed press the `Retry as Sudo...` button

    ```bash
    127.0.0.1 poc.snaatch.com
    ```

Sources:

- <https://create-react-app.dev/docs/advanced-configuration>
- <https://medium.com/@TinaHeiligers1/localhost-on-https-my-domain-on-a-mac-c2f1a98d65a6>
- <https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/>

### Modify the React application

1. Add the `@wemogy/identity` npm package using local linking.

2. Create the `AuthorizationConfig` model

    ```typescript
    new AuthConfiguration(
        'browser',
        'https://auth.snaatch.com',
        'snaatch_app',
        'https://local-dev.app.snaatch.com:3000/callback',
        'offline_access',
        'https://api.snaatch.com')
    ```

3. Add the other required React components to have the `Login`, `Registration` and `Callback` working... (__to be documented__)

4. Register a new user account using the `Registration` flow


## Identity server development/testing topics

### Get the user ID from the Bearer token

Go to <https://jwt.io> and decode the token to get the value of the `sub` property in the payload.

### Getting the user object

1. Forward the Kratos API

    ```bash
    kubectl port-forward svc/wemogy-identity-ory-kratos 7001:4434
    ```

2. Get the user object

    ```bash
    curl http://localhost:7001/identities/<user_id>
    ```
