const awsServerlessExpress = require("aws-serverless-express");
const app = require("./src/app");

const binaryMimeTypes = [
    "application/javascript",
    "application/json",
    "application/octet-stream",
    "application/xml",
    "application/msword",
    "application/x-pdf",
    "application/pdf",
    "font/eot",
    "font/opentype",
    "font/otf",
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "text/comma-separated-values",
    "text/css",
    "text/html",
    "text/javascript",
    "text/plain",
    "text/text",
    "text/xml"
];
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);

exports.handler = (event, context) =>
    awsServerlessExpress.proxy(server, event, context);
