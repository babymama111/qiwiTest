const readline = require("readline")
const getCurrencyRates = require("./getCurrencyRates");

async function getUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Введите валюту (ISO 4217): ", (code) => {
    rl.question("ВВедите дату (YYYY-MM-DD): ", (date) => {
      getCurrencyRates(code, date);
      rl.close();
    });
  });
}

getUserInput();
