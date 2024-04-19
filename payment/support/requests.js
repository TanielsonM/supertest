const supertest = require("supertest");

// URLs base
const gatewayApiUrl = "https://apistaging.gateway.greenn.com.br";
const paymentApiUrl = "https://apipay-staging.greenn.com.br";

// Função para criar o cartão no gateway
async function createCard(cardDetails) {
  return await supertest(gatewayApiUrl)
    .post("/api/checkout/card")
    .set({
      accept: "application/json",
      "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json",
      origin: "https://pay-staging.greenn.com.br",
      referer: "https://pay-staging.greenn.com.br/",
      "sec-ch-ua":
        '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      "x-greenn-gateway": "3a51578a4208e872fa3f3e4f656b5a3a40969",
    })
    .send(cardDetails);
}

// Função para realizar o pagamento
async function makePayment(paymentDetails) {
  return await supertest(paymentApiUrl)
    .post("/api/payment")
    .set({
      accept: "application/json",
      "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json",
      origin: "https://pay-staging.greenn.com.br",
      referer: "https://pay-staging.greenn.com.br/",
      "sec-ch-ua":
        '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      "wd-token-": "{{wd}}", // Substitua '{{wd}}' com o token apropriado
    })
    .send(paymentDetails);
}

module.exports = { createCard, makePayment };
