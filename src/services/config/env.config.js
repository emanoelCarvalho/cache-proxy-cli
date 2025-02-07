const { getEnv } = require("./configService");

class EnvService {
    constructor() {
        this.config = {
            PORT: getEnv("PORT"),
            TARGET: getEnv("TARGET")
        };
    }

    get getPort() {
        return this.config.PORT; 
    }

    get getTarget() {
        return this.config.TARGET; 
    }
}

module.exports = EnvService;
