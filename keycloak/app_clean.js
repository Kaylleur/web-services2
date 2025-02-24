// app.js
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const querystring = require('querystring');

const app = express();
app.use(cookieParser());

const PORT = 3000;

// Variables that might change
const KEYCLOAK_URL = 'http://localhost:8080';
const REALM_NAME = 'myrealm';
const CLIENT_ID = 'myclient';
const CLIENT_SECRET = 'mysecret';
const REDIRECT_URI = `http://localhost:${PORT}/callback`;

const AUTHORIZATION_ENDPOINT = `${KEYCLOAK_URL}/realms/${REALM_NAME}/protocol/openid-connect/auth`;
const TOKEN_ENDPOINT = `${KEYCLOAK_URL}/realms/${REALM_NAME}/protocol/openid-connect/token`;
const USERINFO_ENDPOINT = `${KEYCLOAK_URL}/realms/${REALM_NAME}/protocol/openid-connect/userinfo`;


app.get('/', (req, res) => {
    console.log('Checking if user is connected');
    const accessToken = req.cookies['access_token'];

    console.log('Access token:', accessToken);
    if (!accessToken) {
        console.log('User is not connected');
        res.sendFile(__dirname + '/public/index.html');
    } else {
        // Decode the JWT to get user roles
        console.log('User is connected');
        console.log('should get info from keycloak and show them');
    }
});

app.get('/login', (req, res) => {
    console.log('redirecting user to Keycloak for login');
});
app.get('/callback', (req, res) => {
   console.log('should require receive a code then get access token and set them in cookies')
});


app.get('/logout', (req, res) => {
    console.log('should login out user cookie and keycloak');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
