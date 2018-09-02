const { google } = require("googleapis");

const { getClient } = require("../utils/google-auth");

const {
    getConfig,
    updateTokenConfig,
    saveConfig
} = require("../utils/dev-config");

const config = getConfig();

const SHEET_ID = config.spreadSheetId;

const auth = getClient();

const columnPosition = {
    userName: 0,
    street: 1,
    city: 2,
    email: 3,
    phone: 4,
    education: 5,
    how_hear: 6,
    computer: 7,
    cvUrl: 8,
    mlUrl: 9,
    textArea_message_cv: 10,
    assignmentUrl: 13,
    assignmentFileUrl: 14,
    assignmentMessage: 15
};

function handleApiError(error) {
    const { message } = error;
    const hasTokenError =
        message.indexOf("invalid") != -1 || message.indexOf("expired") != -1;

    if (!hasTokenError || !process.env.DEVELOPMENT) {
        console.log("The API returned an error: " + error);
        return;
    }

    updateTokenConfig(auth).then(token => {
        config.token = token;
        saveConfig(config);
    });
}

function saveApplicant(
    row,
    {
        userName,
        street,
        city,
        email,
        phone,
        education,
        how_hear,
        computer,
        cvUrl,
        mlUrl,
        textArea_message_cv,
        acceptedFirstRound,
        emailSent,
        assignmentFileUrl,
        assignmentUrl,
        assignmentMessage
    }
) {
    return new Promise((resolve, reject) => {
        if (!row) {
            reject(new Error("We couldnt save the record"));
            return;
        }

        const sheets = google.sheets("v4");

        const values = [
            [
                userName,
                street,
                city,
                email,
                phone,
                education,
                how_hear,
                computer,
                cvUrl,
                mlUrl,
                textArea_message_cv,
                acceptedFirstRound,
                emailSent,
                assignmentFileUrl,
                assignmentUrl,
                assignmentMessage
            ]
        ];

        const resource = {
            valueInputOption: "RAW",
            data: [
                {
                    range: `Sheet1!A${row}:R`,
                    majorDimension: "ROWS",
                    values
                }
            ]
        };
        sheets.spreadsheets.values.batchUpdate(
            {
                auth,
                spreadsheetId: SHEET_ID,
                valueInputOption: "USER_ENTERED",
                resource
            },
            err => {
                if (err) {
                    handleApiError(err);
                    reject(err);
                    return;
                }

                resolve();
                console.log("Spreadsheet is updated");
            }
        );
    });
}

function getApplicant(email) {
    return new Promise((resolve, reject) => {
        const sheets = google.sheets("v4");
        sheets.spreadsheets.values.get(
            {
                auth,
                spreadsheetId: SHEET_ID,
                range: "Sheet1"
            },
            (err, response) => {
                if (err) {
                    handleApiError(err);
                    reject(err);
                    return;
                }

                const rows = response.data.values || [];
                const totalRows = (rows.length || 0) + 1;

                let rowIndex = 0;

                const foundedAt = rows.reduce((state, row) => {
                    rowIndex++;

                    const rowEmail = row[columnPosition.email] || "";

                    if (rowEmail.toLowerCase() === email.toLowerCase()) {
                        state = rowIndex;
                    }

                    return state;
                }, false);

                resolve({ foundedAt, totalRows });
            }
        );
    });
}

module.exports = {
    getApplicant,
    saveApplicant
};
