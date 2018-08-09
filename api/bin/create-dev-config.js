const fs = require('fs');
const path = require("path")
const readline = require("readline")
const googleClient = require("../src/utils/google-auth");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const PATH_CONFIG = path.join(__dirname, "../google-sheet-config.json");
const GOOGLE_CONFIG_URL = 'https://developers.google.com/sheets/api/quickstart/nodejs';
if (fs.existsSync(PATH_CONFIG)) {
    process.exit(0);
    return;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('google-sheet-config.json is missing!');
console.log(`1) We need to create an App, Go to this URL: ${GOOGLE_CONFIG_URL}`);

const question = (text) => {
    return new Promise(resolve => {
        rl.question(text, (answer) => {
            
            rl.close();
            resolve(answer);
        })
    });
};

const config = {};
question('Insert the ClientID:')
    .then(clientID => {
        config.clientID = clientID;
        return question('Insert the ClientSecret: ');
    })
    .then(clientSecret => {
        config.clientSecret = clientSecret;

        console.log(`2) Visit Google Spreadsheet and create a new document:`);
        console.log('https://docs.google.com/spreadsheets');
        console.log('Get the id from the url');

        return question('Insert Spreadsheet ID: ');
    }).then(spreadSheetId => {
        config.spreadSheetId = spreadSheetId;

        const authUrl = googleClient(config.clientID, config.clientSecret).generateAuthUrl({
            access_type: "offline",
            scope: SCOPES
        });
        console.log('Visit this url: ', authUrl)
        // Here we need to create an oauth2Client with clientId
        // and clientSecret
        return question('Insert the token: ');
    }).then(token => {
        // Here we write the file.
        config.token = token;
        fs.writeFileSync(PATH_CONFIG, JSON.stringify(config));
        console.log("The file is cread :)")
    });