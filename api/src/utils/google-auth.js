const { OAuth2Client } = require("google-auth-library");

const redirectUrl = "urn:ietf:wg:oauth:2.0:oob";

function createClient (clientId, clientSecret, token) {
    const client = new OAuth2Client(clientId, clientSecret, redirectUrl);

    if(token){
        
        client.credentials = token;
        
    }
    return client;
}

function getClient() {

    let config;
    
    if (process.env.DEVELOPMENT) {

        config = require('./../../google-sheet-config.json');
    
    }

    const hasEnviromentConfig = (
        process.env.GOOGLE_CLIENT_ID &&
        process.env.GOOGLE_CLIENT_SECRET &&
        process.env.GOOGLE_TOKEN
    );

    if (hasEnviromentConfig) {

        config = {
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            token: GOOGLE_TOKEN
        };

    }

    if (Object.keys(config).length === 0) {

        throw new Error('No configurations is provided for the auth client');
    
    }

    return createClient(config.clientId, config.clientSecret, config.token);

}

module.exports = {
    getClient,
    createClient
}
