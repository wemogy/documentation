---
sidebar_position: 4
---

# Development

TBD...

- How to develop against
- Start locally with Docker-Compose
- CNAME to localhost trick

## Local development

The identity service does not work across domains. This means, if the identity service is currently hosted on `myapp.com`, you won't be able to develop against this instance from `localhost`, as these are two different domains. This is mainly due to the lack of Ory Kratos to work across domains.

To use the identity service with local development, you have the following options:

- Run a local instance of wemogy Identity
- Trick your local web server into assuming to host from myapp.com instead of localhost and modify your DNS entries

### Run a local instance of wemogy Identity

Coming soon...

### Run your local app on a different domain than localhost

For this, we can trick the local web server into assuming that is hosts the local app from the same domain that the identity service runs on instead of `localhost`.

#### Override your app's domain with localhost

First, we need to modify DNS on our development machines in a way, that whenever we navigate to `myapp.com`, it gets resolved to our local machine instead of the actual app hosted on a public IP address in the cloud. The easiest way to achieve this, is to add the following line to your etc/hosts file:

```text title="/etc/hosts"
# Use local version of myapp.com for development
127.0.0.1 myapp.com
```

This ensures, that once the identity service redirects to `https://myapp.com/login` for the login self-service flow for example, your browser will serve from the instance of your app that is running locally.

:::caution Warning
While this is active, you won't be able to visit the real `https://myapp.com` anymore from your machine. Make sure to remove or comment the line in `etc/hosts` afterwards.
:::

#### Secure the local app with SSL and serve it on port 443 

We also need to make sure, that we are not leaving SSL land when using the local instance of our app. For this, we need to make sure, is uses HTTPS and gets exposed on the same port your production app is running on (usually  443).

Next, we will need a certificate for your domain that can be served by the local web server. Install mkcert on your machine and run the following commands from the root directory of your web app.

```bash
# Install mkcert
mkcert -install

# Create .cert directory if it doesn't exist
mkdir -p .cert

# Generate a certificate for localhost
mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"
```

:::caution Warning
Don't check-in these certificates into your version control, as they contain confidential information.
:::

Now we have to configure the local web server to use `myapp.com` instead of `localhost` as its host and use the same port as our production app (usually  443).

#### Example

You can instruct the local web server by creating a file called `.env.development` in the root folder of your app. In there, we can instruct the web server to serve on our domain instead of localhost and use the certificates that we have just created.

```text title=".env.development"

```
You can instruct the local web server by creating a file called `.env.development` in the root folder of your app. In there, we can instruct the web server to serve on our domain instead of localhost and use the certificates that we have just created.

When running `yarn start` now, your browser will open on `myapp.com` but serve the locally running version of your app.

####Cleanup

Don't forget to remove the line from the /etc/hosts file after development, to be able to visit the actual myapp.com website again.

