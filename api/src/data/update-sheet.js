const {
    google
} = require("googleapis");

const {
    getClient
} = require("../utils/google-auth");

const {
    getConfig,
    updateTokenConfig,
    saveConfig
} = require("../utils/dev-config");

const config = getConfig();

const SHEET_ID = config.spreadSheetId;

const auth = getClient();

const columnPosition = {
    name: 0,
    street: 1,
    city: 2,
    email: 3,
    phone: 4,
    education: 5,
    who_hear: 6,
    computer: 7
};

function handleApiError(error) {

    const {
        message
    } = error;
    const hasTokenError = message.indexOf('invalid') != -1 || message.indexOf('expired') != -1;

    if (!hasTokenError || !process.env.DEVELOPMENT) {
        console.log("The API returned an error: " + error);
        return;
    }

    updateTokenConfig(auth).then(token => {
        config.token = token;
        saveConfig(config);
    });


}


function getRow(rows, email) {

    let foundRow = -1;

    rows.forEach((row, rowNumber) => {

        if (row[columnPosition.email] === email) {
            foundRow = rowNumber;
        }

    });

    console.log(foundRow);
    return foundRow;

}

function save(row, {
    name,
    street,
    city,
    email,
    phone,
    education
}) {

    if (!row) throw new Error('We couldnt save the record');

    const sheets = google.sheets("v4");

    const values = [
        [
            name,
            street,
            city,
            email,
            phone,
            education
        ]
    ]

    const resource = {
        valueInputOption: "RAW",
        data: [{
            range: `Sheet1!A${row}:H`,
            majorDimension: "ROWS",
            values
        }]
    }
    sheets.spreadsheets.values.batchUpdate({
            auth,
            spreadsheetId: SHEET_ID,
            valueInputOption: "USER_ENTERED",
            resource
        },
        (err, res) => {
            if (err) {
                handleApiError(err);
                return;
            }

            console.log("Spreadsheet is updated");
        }
    );
}

function getApplicant(email) {
    return new Promise((resolve) => {
        const sheets = google.sheets("v4");
        sheets.spreadsheets.values.get({
                auth,
                spreadsheetId: SHEET_ID,
                range: "Sheet1"
            },
            (err, response) => {
                if (err) {
                    handleApiError(err);
                    return;
                }

                const rows = response.data.values;

                if (rows.length !== 0) {

                    const result = getRow(rows, email);

                    if (result !== -1) {
                        resolve(result + 1);
                        return;
                    }

                }

                resolve(rows.length + 1);
            }
        );
    });
}

function updateApplicant(email, updates) {

    return getApplicant(email)
        .then((row) => {

            console.log(row);
            return save(row, updates);

        })
        .catch((msg, totalRows) => {

            console.log(totalRows, msg);

        });

}

module.exports = {
    getApplicant,
    updateApplicant
};
