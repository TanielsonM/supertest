const request = require("../../support/requests"); // Importa as funções de request
const pixData = require("../../fixtures/contacts/pixData.json"); // Importa os dados do pix

describe("Payment API", () => {
  let response;

  // Fazendo a request de pagamento
  beforeAll(async () => {
    response = await request.makePayment(pixData);
  });

  // Teste 1: Verifica o status code da request
  it("Verificar o status code da request", async () => {
    expect(response.status).toBe(200);
  });

  // Teste 2: Verifica se existe um 'sale_id'
  it('Verificar se existe um "sale_id"', () => {
    const responseBody = response.body;
    expect(responseBody.sales[0].sale_id).toBeDefined();
  });

  // Teste 3: Verifica se o campo 'amount' é igual a 20
  it('Verificar se o campo "amount" é igual a 20', () => {
    const responseBody = response.body;
    expect(responseBody.sales[0].product.amount).toBe(20);
  });

  // Teste 4: Verifica se o 'qrcode' não é nulo ou vazio na resposta
  it('Verificar se "qrcode" não é nulo ou vazio', () => {
    const responseBody = response.body;
    expect(responseBody.sales).toBeInstanceOf(Array);

    if (responseBody.sales.length > 0) {
      expect(responseBody.sales[0]).toHaveProperty("qrcode");
      expect(responseBody.sales[0].qrcode).not.toBeNull();
      expect(responseBody.sales[0].qrcode).not.toBe("");
    } else {
      throw new Error("Não há itens em 'sales' na resposta.");
    }
  });
});
