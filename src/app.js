const express = require("express"); //load express moduleconst app = express()
const { Client, Token } = require('strava-oauth2');
const app = express();
const {parse, stringify, toJSON, fromJSON} = require('flatted');

const middleware = require("../src/routes");

app.use("/strava", middleware);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const config = {
  authorization_uri: 'https://www.strava.com/api/v3/oauth/authorize',
  token_uri: 'https://www.strava.com/api/v3/oauth/token',
  revocation_uri: 'https://www.strava.com/api/v3/oauth/deauthorize',
  client_id: "67455",
  client_secret: "6664ed63e6bdf33157406afc37fbecfb0739fef5",
  redirect_uri: 'http://localhost:4500/auth/callback',
  scopes: ['read','activity:read_all'],
}

const client = new Client(config); 
//  
app.get('/auth', (req, res) => {
  res.redirect(client.getAuthorizationUri());
});

// Must be the same as the redirect_uri specified in the config      
app.get('/auth/callback', async (req, res) => {
  const token = await client.getToken(req.originalUrl);
  var athlete =""
  if (!token.hasExpired()) {
      // If the token has expired the below will throw an exception 
      const axios_instance = token.getSignedAxiosInstance();
  
      athlete = await axios_instance.get('https://www.strava.com/api/v3/athlete/activities');
      //console.log(stringify(athlete))
      // test = stringify(athlete)
      // res.send(test)
      
  }

  //console.log(athlete) 
  res.send(athlete.data)
  
});


module.exports = app;
