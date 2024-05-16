const supertest = require("supertest");

// URLs base
const gatewayApiUrl = "https://apistaging.gateway.greenn.com.br";
const paymentApiUrl = "https://apipay-staging.greenn.com.br";

const headers = {
  "sec-ch-ua":
    '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
  "sec-ch-ua-mobile": "?0",
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "content-type": "application/json",
  accept: "application/json",
  Referer: "https://pay-staging.greenn.com.br/",
  "sec-ch-ua-platform": '"Linux"',
};

// Função da request do card
async function createCard(cardDetails) {
  return await supertest(gatewayApiUrl)
    .post("/api/checkout/card")
    .set(headers)
    .set("x-greenn-gateway", "88c92519b06ebc40348da8cdf6b5d88a47864") 
    .send(cardDetails);
}

// Função da request do payment
async function makePayment(paymentDetails) {
  return await supertest(paymentApiUrl)
    .post("/api/payment")
    .set(headers)
    .set("wd-token-", "{{wd}}") 
    .send(paymentDetails);
}

module.exports = { createCard, makePayment };
