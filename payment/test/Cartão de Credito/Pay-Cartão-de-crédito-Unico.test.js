const { createCard, makePayment } = require("../../support/requests");
const cardData = require("../../fixtures/card/cardData.json");
const paymentData = require("../../fixtures/contacts/paymentData.json");

describe("Payment Gateway Tests", () => {
  let cardId; // ID do cartão para uso no teste de pagamento

  // Teste para criação de cartão
  it("should create a card and verify response", async () => {
    const response = await createCard(cardData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("card_id");
    cardId = response.body.card_id; // Salva o cardId para uso no próximo teste
  });

  // Teste para pagamento
  it("should make a payment and verify response", async () => {
    // Adiciona o cardId ao payload do pagamento
    paymentData.cards[0].id = cardId;
    const response = await makePayment(paymentData);
    expect(response.status).toBe(200);
    expect(response.body.sales[0]).toHaveProperty("sale_id");
  });
});
