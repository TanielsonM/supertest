const { createCard, makePayment } = require("../../support/requests");
const cardData = require("../../fixtures/card/cardData.json");
let paymentDataWithCoupon = require("../../fixtures/contacts/paymentData.json");

describe("Payment with Coupon Tests", () => {
  let cardId; // ID do cartão para uso no teste de pagamento

  // Teste para criação de cartão
  it("should create a card and verify response", async () => {
    const response = await createCard(cardData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("card_id");
    cardId = response.body.card_id; // Salva o cardId para uso no próximo teste
  });

  it("should make a payment with a coupon and verify the response", async () => {
    // Clone e modifique o objeto paymentData para incluir o cupom
    paymentDataWithCoupon = {
      ...paymentDataWithCoupon,
      total: 19, // Total com desconto do cupom
      products: [
        {
          ...paymentDataWithCoupon.products[0],
          coupon: "CUPOM1REAL", // Adicionando o cupom
        },
      ],
    };

    const paymentResponse = await makePayment(paymentDataWithCoupon);
    expect(paymentResponse.status).toBe(200);
    // Verifique se o cupom foi aplicado corretamente, se possível
  });
});
