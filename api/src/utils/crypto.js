/**
 * encryptData Take a data as parameter and return it as encrypted string
 *
 * @param {string} data
 *
 * decryptData Take an encryption as parameter and return it as string
 *
 * @param {string} encryptedEmail an encrypted string
 */

const crypto = require("crypto");

const key = process.env.ENCRYPT_KEY || "class14";

function encryptData(data) {
    const cipher = crypto.createCipher("aes192", key);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

function decryptData(encryptedData) {
    const decipher = crypto.createDecipher("aes192", key);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

module.exports = {
    encryptData,
    decryptData
};
