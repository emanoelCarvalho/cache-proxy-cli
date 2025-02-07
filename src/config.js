require('dotenv').config(); // Carrega as variáveis de ambiente

const requiredVars = ["PORT", "TARGET"];

if (requiredVars.some((env) => !process.env[env])) {
    throw new Error("Variáveis de ambiente não configuradas");
}

const getEnv = (key) => process.env[key];

module.exports = {
    getEnv
};
