const fs = require('fs');
const path = require("path")
const readline = require("readline")
const { createClient } = require("../src/utils/google-auth");

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
            resolve(answer);
        })
    });
};

const config = {};
let client;
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

        client = createClient(config.clientID, config.clientSecret);

        const authUrl = client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES
        });
        console.log('Visit this url: ', authUrl)
    
        return question('Insert the token: ');

    }).then(code => {
        
        // We need to close to prompt
        rl.close();
        
        client.getToken(code, (err, token) => {
            
            if (err) {
                console.error("Error while trying to retrieve access token");
                throw new Error(err);
            }
            
            config.token = token;
            
            fs.writeFileSync(PATH_CONFIG, JSON.stringify(config));
            console.log("The file is cread :)");

        });

    });