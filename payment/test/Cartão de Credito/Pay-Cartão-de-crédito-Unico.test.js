const { createCard, makePayment } = require("../../support/requests");
const card = require("../../fixtures/card/card.json");
const paymentData = require("../../fixtures/contacts/cardData.json");

describe("Payment Gateway Tests", () => {
  let cardId; // ID do cartão para uso no teste de pagamento

  // Teste para criação de cartão
  it("Validar request de criar o card", async () => {
    const response = await createCard(card);
    // Verifica o status da resposta
    expect(response.status).toBe(200); 

    // Verifica a propriedade id na resposta
    expect(response.body).toHaveProperty("id"); 

    // Salva o cardId para uso no próximo teste
    cardId = response.body.id; 
  });

  // Teste para pagamento
  it("Validar request de pagamento", async () => {
    // Adiciona o cardId ao payload do pagamento
    paymentData.cards[0].id = cardId;
    const response = await makePayment(paymentData);

    // Teste 1: Verifica o status code da request
    expect(response.status).toBe(200); 

    // Teste 2: Verifica se existe um 'sale_id'
    expect(response.body.sales[0]).toHaveProperty("sale_id"); 

    // Teste 3: Verifica se o campo 'amount' é igual a 20
    expect(response.body.sales[0].product.amount).toBe(20);
  });
});
