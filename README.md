# Klaku Clothing API

The API server for [Klaku Clothing](https://github.com/nacen-dev/klaku-client) built with Node.js

## How to use

### Step 1. To launch the project create a .env file inside the root directory

### Step 2. Setup environment variables

Generate new keys for access token and refresh token using https://travistidwell.com/jsencrypt/demo/

Encode them in Base64 after generating the keys using this link: https://www.base64encode.org/

- `ACCESS_TOKEN_PUBLIC_KEY`: Enter your encoded Base64 access token public key
- `ACCESS_TOKEN_PRIVATE_KEY`: Enter your encoded Base64 access token private key
- `REFRESH_TOKEN_PUBLIC_KEY`: Enter your encoded Base64 refresh token public key
- `REFRESH_TOKEN_PRIVATE_KEY`: Enter your encoded Base64 refresh token private key
- `SMTP_HOST`: Enter your host from your SMTP service
- `SMTP_USER`: Enter your user from your SMTP service
- `SMTP_PASS`: Enter your password from your SMTP service
- `SMTP_PORT`: Enter the port from your SMTP Service
- `SMTP_SECURE`: Either true or false if true the connection will use TLS when connecting to server. If false (the default) then TLS is used if server supports the STARTTLS extension. In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false
- `STRIPE_SECRET_KEY`: Enter your Stripe secret key you can get it from your [stripe dashboard](https://dashboard.stripe.com/test/apikeys)
- `CLIENT_URL`: Enter the client/frontend application's url 
- `DB_URI`: Enter your database URI

## Packages used

- `Node.js`: JavaScript environment enabling JavaScript to run on a server
- `Express`: Node.js framework
- `JWT`: For authentication
- `Mongoose`: MongoDB ORM
- `Typegoose`: Giving Types for Mongoose
- `Argon2`: Hashing passwords
- `config, dotenv`: for .env configuration
- `lodash`: Using utility functions
- `nanoid`: A tiny, secure, URL-friendly, unique string ID generator for JavaScript.
- `TypeScript`: Giving types for JavaScript
- `Zod` - Schema declaration and validation
- `Stripe` - Payment processor
- `cookie parser`: Parsing cookies in express
- `cors`: Enabling cors request
- `nodemailer`: Sending emails
- `pino`: Logger
- `Day.js`: Minimalist date library

## Features to implement

- Create a Webhook to handle post-payment events
- Create Orders after payment
- Send Confirmation Email after payment
