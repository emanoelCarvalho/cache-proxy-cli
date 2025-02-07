require('dotenv').config(); 

const getEnv = (key) => process.env[key];

module.exports = {
    getEnv, 
}