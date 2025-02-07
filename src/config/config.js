const yargs = require("yargs");

const argv = yargs
  .option("port", {
    alias: "p",
    description: "Define a porta do proxy",
    default: 3000,
    type: "number",
  })
  .option("target", {
    alias: "t",
    description: "URL do servidor de destino",
    demandOption: true,
    type: "string",
  })
  .argv;

module.exports = argv;
