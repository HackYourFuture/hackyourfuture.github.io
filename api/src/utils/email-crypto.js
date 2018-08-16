/**
 * encryptEmail Take an email as parameter and return it as encrypted string
 *
 * @param {string} email email address of an existing applicant
 * 
 * decryptEmail Take an encryption as parameter and return it as string
 *
 * @param {string} encryptedEmail an encrypted string
 */

const crypto = require("crypto");

const key = process.env.ENCRYPT_KEY || "class14";

function encryptEmail(email) {
    const cipher = crypto.createCipher('aes192', key);
    let encrypted = cipher.update(email, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;    
}

function decryptEmail(encryptedEmail) { 
    const decipher = crypto.createDecipher('aes192', key);
    let decrypted = decipher.update(encryptedEmail, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = {
    encryptEmail,
    decryptEmail 
};