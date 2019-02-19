module.exports = function checkAddressForInfo(email) {
    let fromEmail;
    switch (email) {
        case "application@hackyourfuture.net":
            fromEmail = "application@hackyourfuture.net";
            break;
        case "cph@hackyourfuture.net":
            fromEmail = "cph@hackyourfuture.net";
            break;
        case "malmoe@hackyourfuture.net":
            fromEmail = "malmoe@hackyourfuture.net";
            break;
        default:
            fromEmail = "info@hackyourfuture.net";
    }
    return fromEmail;
};
