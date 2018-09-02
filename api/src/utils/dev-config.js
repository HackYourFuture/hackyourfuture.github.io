const fs = require("fs");
const path = require("path");
const readline = require("readline");

const PATH_CONFIG = path.join(__dirname, "../../google-sheet-config.json");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function updateTokenConfig(client) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const question = text => {
        return new Promise(resolve => {
            rl.question(text, answer => {
                resolve(answer);
            });
        });
    };

    // We should create a new token
    const authUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES
    });

    console.log("Your token is expired or invalid, generate a new one");
    console.log("Visit this url: ", authUrl);
    return question("Insert the token: ").then(code => {
        // We need to close to prompt
        rl.close();
        return new Promise(resolve => {
            client.getToken(code, (err, token) => {
                if (err) {
                    console.error(
                        "Error while trying to retrieve access token"
                    );
                    throw new Error(err);
                }

                resolve(token);
            });
        });
    });
}

function saveConfig(config) {
    fs.writeFileSync(PATH_CONFIG, JSON.stringify(config));
    console.log("The file is created :)");
}

function getConfig() {
    if (!process.env.DEVELOPMENT)
        return {
            // This needs to be converted to an environment variable
            spreadSheetId: "1CRF9TbwSayVq9yhrUCCv038DG0jPGBN7ehOyZa4mvE0"
        };

    return JSON.parse(fs.readFileSync(PATH_CONFIG));
}

module.exports = {
    PATH_CONFIG,
    getConfig,
    updateTokenConfig,
    saveConfig
};
