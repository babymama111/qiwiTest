const { URLSearchParams } = require("url");
const axios = require("axios");
const { DOMParser } = require("xmldom");
const formatDate = require("./date_format");
require("dotenv").config();

const API_URL = "https://www.cbr.ru/scripts/XML_daily.asp";

async function getCurrencyRates(code, date) {
  const params = new URLSearchParams({
    date_req: formatDate(date),
  });

  try {
    const response = await axios.get(API_URL, { params });
    const data = response.data;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "application/xml");

    const charCodes = xmlDoc.getElementsByTagName("CharCode");
    const values = xmlDoc.getElementsByTagName("Value");
    const nameOF = xmlDoc.getElementsByTagName("Name");

    let rate = "";
    let name = "";

    for (let i = 0; i < charCodes.length; i++) {
      const charCode = charCodes[i].textContent;

      if (charCode === code.toUpperCase()) {
        rate = values[i].textContent;
        name = nameOF[i].textContent;
        break;
      }
    }

    if (!rate) {
      console.log(
        `К сожалению, значение валюты ${code} на дату ${date} не найдено!`
      );
      return;
    }

    console.log(`${code.toUpperCase()} (${name}): ${rate}`);
  } catch (error) {
    console.error(`Ошибка!!!: ${error.message}`);
  }
}
module.exports = getCurrencyRates;
