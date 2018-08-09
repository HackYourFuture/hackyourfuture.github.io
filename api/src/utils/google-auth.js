const { OAuth2Client } = require("google-auth-library");

const redirectUrl = "urn:ietf:wg:oauth:2.0:oob";

module.exports = (clientId, clientSecret, token) =>{
    const client = new OAuth2Client(clientId, clientSecret, redirectUrl);

    if(token){
        client.credentials = JSON.parse(token);
        
    }
    return client;
}


