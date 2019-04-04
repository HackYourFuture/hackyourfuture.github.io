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
    firstName: 0,
    lastName: 1,
    city: 2,
    email: 3,
    phone: 4,
    education: 5,
    how_hear: 6,
    computer: 7,
    note: 8,
    cv: 9,
    motivation: 10,
    textArea_message_cv: 11,
    textArea_message_motivation: 12,
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
        firstName,
        lastName,
        city,
        email,
        phone,
        education,
        how_hear,
        computer,
        note,
        cv,
        motivation,
        textArea_message_cv,
        textArea_message_motivation,
        acceptedFirstRound,
        emailSent,
        assignmentFileUrl,
        assignmentUrl,
        assignmentMessage
    }
) {
    console.log("what my cv", cv);

    return new Promise((resolve, reject) => {
        if (!row) {
            reject(new Error("We couldnt save the record"));
            return;
        }

        const sheets = google.sheets("v4");

        const cvUrl = `https://hyf-website-uploads.s3.eu-central-1.amazonaws.com/${cv}`;

        const values = [
            [
                firstName,
                lastName,
                city,
                email,
                phone,
                education,
                how_hear,
                computer,
                note,
                cvUrl,
                motivation,
                textArea_message_cv,
                textArea_message_motivation,
                acceptedFirstRound,
                emailSent,
                assignmentFileUrl,
                assignmentUrl,
                assignmentMessage
            ]
        ];

        console.log("row is", row);

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

                const objectRow = (state, iterValue, iterIndex) => {
                    const cellName = Object.keys(columnPosition).filter(
                        name => columnPosition[name] === iterIndex
                    )[0];
                    state[cellName] = iterValue;
                    return state;
                };
                const row = foundedAt
                    ? rows[foundedAt - 1].reduce(objectRow, {})
                    : {};

                resolve({ foundedAt, totalRows, row });
            }
        );
    });
}

module.exports = {
    getApplicant,
    saveApplicant
};
