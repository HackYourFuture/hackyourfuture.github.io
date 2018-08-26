const { OAuth2Client, auth } = require("google-auth-library");
const { getConfig } = require("./dev-config");

const redirectUrl = "urn:ietf:wg:oauth:2.0:oob";
const { GOOGLE_APP } = process.env;

function getEnviromentConfig() {
    if (!GOOGLE_APP) return false;

    try {
        return JSON.parse(Buffer.from(GOOGLE_APP, "base64").toString("utf-8"));
    } catch (e) {
        console.log("An error occurred on the getEnviromentConfig", e);
        return false;
    }
}

function createClient(clientId, clientSecret, token) {
    const client = new OAuth2Client(clientId, clientSecret, redirectUrl);

    if (token) {
        client.credentials = token;
    }
    return client;
}

function getJWTClient(config) {
    const client = auth.fromJSON(config);

    client.scopes = ["https://www.googleapis.com/auth/spreadsheets"];

    return client;
}

function getClient() {
    let config = getEnviromentConfig();

    // Here means that we're in the production mode
    // So we can retunr a different client
    if (config) {
        const client = getJWTClient(config);
        return client;
    }

    if (process.env.DEVELOPMENT) {
        config = getConfig();
    }

    if (Object.keys(config).length === 0) {
        throw new Error("No configurations is provided for the auth client");
    }

    return createClient(config.clientID, config.clientSecret, config.token);
}

module.exports = {
    getClient,
    createClient
};
