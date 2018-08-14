const crypto = require("crypto");

const key = "class14";

function emailEnc(email) {
    const cipher = crypto.createCipher('aes192', key);
    let encrypted = cipher.update(email, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;    
}

function emailDec(encryptedEmail) { 
    const decipher = crypto.createDecipher('aes192', key);
    let decrypted = decipher.update(encryptedEmail, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = {
    emailEnc,
    emailDec 
};