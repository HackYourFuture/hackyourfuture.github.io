const {google} = require("googleapis");

function appendData(req, auth) {
  return new Promise((resolve, reject) => {
    var sheets = google.sheets("v4");
    sheets.spreadsheets.values.append(
      {
        auth: auth,
        spreadsheetId: "1Hhcfr4FdLQMP6PVb_aROHLqqXoDXvmmzzY3N0pc6xI4", //Replace it with your spreadshit ID
        range: "Sheet1",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[req.body.userName, req.body.street, req.body.city, req.body.email, req.body.phone, req.body.education, req.body.how_hear, req.body.computer]]
        }
      },
      (err, response) => {
        if (err) {
          reject("The API returned an error: " + err)
        } else {
          resolve("Appended")
        }
      }
    );
  });
  }

  module.exports = appendData;