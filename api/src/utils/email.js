const fs = require('fs');
const path = require('path');
const template = require('lodash.template');

const EMAILS_DIRECTORIES = path.join(__dirname, '../../emails_template');

module.exports = (emailFile, data) => {

    const PATH_EMAIL = path.join(EMAILS_DIRECTORIES, emailFile);

    if (!fs.existsSync(PATH_EMAIL)) {
        throw new Error(`Not email found ${PATH_EMAIL}`);
    }
    
    let email;
    if (process.env.DEVELOPMENT) {
        email = fs.readFileSync(PATH_EMAIL);
        return template(email)(data || {});
    }

    return template(require(PATH_EMAIL))(data);

}