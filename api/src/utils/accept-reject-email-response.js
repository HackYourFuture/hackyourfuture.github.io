/* eslint-disable */
// Eslint is disable because this chunk of code has
// to be run in (tools/script editor) window of the spread sheet

// The code which sends rejection or acceptance emails to the applicants automatically.
// 1- copy this code to tools/script editor in your spread sheet
// 2- fill in the messages you want to send.
// 3- click on the run button.

var EMAIL_SENT = "EMAIL_SENT";
var SUBJECT = "Your application result from Hack Your Future";
var APPLICANT_ACCEPTED = "place the acceptance message here";
var APPLICANT_REJECTED = "place the rejection message here";
function sendEmails2() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;
  var dataRange = sheet.getRange(
    2,
    1,
    sheet.getLastRow() - 1,
    sheet.getLastColumn()
  );
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var emailAddress = row[3];
    var emailSent = row[11]; // 12th column that we apply the result of the sending email. //DON'T EDIT THE VALUE OF THE COLUMN MANUALLY
    var applicantAccepted = row[10]; // 11th column The final result weather the applicant is accepted or not // Value must be "yes", "no" or "processing"
    if (emailSent != EMAIL_SENT && applicantAccepted != "processing") {
      if (applicantAccepted.toString().toLowerCase() == "yes") {
        MailApp.sendEmail(emailAddress, SUBJECT, APPLICANT_ACCEPTED);
        sheet.getRange(startRow + i, 12).setValue(EMAIL_SENT);
        SpreadsheetApp.flush();
      } else if (applicantAccepted.toString().toLowerCase() == "no") {
        MailApp.sendEmail(emailAddress, SUBJECT, APPLICANT_REJECTED);
        sheet.getRange(startRow + i, 12).setValue(EMAIL_SENT);
        SpreadsheetApp.flush();
      }
    }
  }
}