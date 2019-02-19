module.exports = function countryEmail(country) {
    let fromEmail;
    switch (country) {
        case "nl":
            fromEmail = "application@hackyourfuture.net";
            break;
        case "dk":
            fromEmail = "cph@hackyourfuture.net";
            break;
        case "se":
            fromEmail = "malmoe@hackyourfuture.net";
            break;
        default:
            fromEmail = "info@hackyourfuture.net";
    }
    return fromEmail;
};
