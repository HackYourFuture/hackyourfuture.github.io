process.env.DEVELOPMENT = true;
process.env.AWS_ACCESS_KEY_ID = "";
process.env.AWS_SECRET_ACCESS_KEY = "";

const app = require("./src/app");

app.listen(3005);
