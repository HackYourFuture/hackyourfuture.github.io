const fs = require("fs");
const { OAuth2Client } = require("google-auth-library");
const { getConfig } = require("./dev-config");

const redirectUrl = "urn:ietf:wg:oauth:2.0:oob";

function createClient(clientId, clientSecret, token) {
  const client = new OAuth2Client(clientId, clientSecret, redirectUrl);

  if (token) {
    client.credentials = token;
  }
  return client;
}

function getClient() {
  let config;

  if (process.env.DEVELOPMENT) {
    config = getConfig();
  }

  const hasEnvironmentConfig =
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_TOKEN;

  if (hasEnvironmentConfig) {
    config = {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      token: JSON.parse(GOOGLE_TOKEN)
    };
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
