const fs = require("fs");
const path = require("path");
const template = require("lodash.template");

const EMAILS_DIRECTORIES = path.join(__dirname, "../../emails_template");

module.exports = (emailFile, data) => {
  const PATH_EMAIL = path.join(EMAILS_DIRECTORIES, emailFile);

  if (!!process.env.DEVELOPMENT && !fs.existsSync(PATH_EMAIL)) {
    throw new Error(`Not email found ${PATH_EMAIL}`);
  }

  let email;
  if (process.env.DEVELOPMENT) {
    email = fs.readFileSync(PATH_EMAIL);
    return template(email)(data || {});
  }

  const emails = {
    "apply_to_org.tpl": require("../../emails_template/apply_to_org.tpl"),
    "apply_to_student.tpl": require("../../emails_template/apply_to_student.tpl"),
    "dk/apply_to_student.tpl": require("../../emails_template/dk/apply_to_student.tpl"),
    "se/apply_to_student.tpl": require("../../emails_template/se/apply_to_student.tpl"),
    "contact_us.tpl": require("../../emails_template/contact_us.tpl"),
    "send_to_admin.txt": require("../../emails_template/send_to_admin.txt"),
    "apply_to_teach_to_org.tpl": require("../../emails_template/apply_to_teach_to_org.tpl")
  };

  return template(emails[emailFile])(data);
};
