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
  computer: 7
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

function save(
  row,
  { userName, street, city, email, phone, education, how_hear, computer }
) {
  if (!row) throw new Error("We couldnt save the record");

  const sheets = google.sheets("v4");

  const values = [
    [userName, street, city, email, phone, education, how_hear, computer]
  ];

  const resource = {
    valueInputOption: "RAW",
    data: [
      {
        range: `Sheet1!A${row}:H`,
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
  return new Promise(resolve => {
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

        let i = 0;
        const foundedAt = rows.reduce((row, state) => {
          i++;
          const rowEmail = row[columnPosition.email] || "";
          if (rowEmail.toLowerCase() === email.toLowerCase()) {
            state = i;
          }

          return state;
        }, false);

        resolve({ foundedAt, totalRows: rows.length || 0 });
      }
    );
  });
}

function updateApplicant(email, updates) {
  return getApplicant(email)
    .then(({ foundedAt, totalRows }) => {
      let row;

      // Spreadsheet is empty
      if (!foundedAt && totalRows === 0) {
        row = 1;
      }

      // Record is not founded but we add to the latest row
      if (!foundedAt && totalRows !== 0) {
        row = totalRows + 1;
      }

      if (foundedAt) {
        row = foundedAt;
      }

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
