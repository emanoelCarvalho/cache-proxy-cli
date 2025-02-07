require("dotenv").config();

const requiredEnvVars = ["PORT", "TARGET"];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} não foi definida no arquivo .env`);
  }
});

const getEnv = (key) => process.env[key];

module.exports = {
  getEnv,
};
