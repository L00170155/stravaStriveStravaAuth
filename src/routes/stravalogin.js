const { Client, Token } = require('strava-oauth2');
const express = require("express"); //load express moduleconst app = express()

const stravaapp = express();

    const config = {
        authorization_uri: 'https://www.strava.com/api/v3/oauth/authorize',
        token_uri: 'https://www.strava.com/api/v3/oauth/token',
        revocation_uri: 'https://www.strava.com/api/v3/oauth/deauthorize',
        client_id: "67455",
        client_secret: "6664ed63e6bdf33157406afc37fbecfb0739fef5",
        redirect_uri: 'https://localhost',
        scopes: ['read'],
    }

    const client = new Client(config); 
    
    

    
    stravaapp.get('/auth', (req, res) => {
        res.redirect(client.getAuthorizationUri());
    });
    
    // Must be the same as the redirect_uri specified in the config 
    stravaapp.get('/auth/callback', async (req, res) => {
        const token = await client.getToken(req.originalUrl);
        if (!token.hasExpired()) {
            // If the token has expired the below will throw an exception
            const axios_instance = token.getSignedAxiosInstance();
        
            const athlete = axios_instance.get('https://www.strava.com/api/v3/athletes/4191787');
            console.log(athlete)
        }
    
        res.redirect('/home');
    });
    
    stravaapp.get('/home', (req, res) => {
        res.send('Welcome!');
    });

        
    module.exports= Token

