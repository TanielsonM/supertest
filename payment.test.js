const supertest = require("supertest");

const apiUrl = "https://apipay-staging.greenn.com.br";

describe("Payment API Endpoint Tests", () => {
  it("should process a PIX payment successfully and verify response details", async () => {
    const response = await supertest(apiUrl)
      .post("/api/payment")
      .send({
        method: "PIX",
        amount: 20,
        total: 20,
        product_id: "35008",
        products: [{ product_id: 35008 }],
        name: "Qa Test",
        email: "test_payer_123456789@testuser.com",
        cellphone: "+5544944444444",
        document: "707.952.041-08",
        uuid: "036f3d8c-161e-4ddd-a483-a0d6ac9115fa",
        country_code: "BR",
        zipcode: null,
        street: "",
        number: 0,
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        language: "pt",
        metas: {},
        currency_data: {
          local_currency: "BRL",
          base_currency: "BRL",
        },
      })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    // Teste 1: Verificar o status code da request
    expect(response.status).toBe(200);

    // Teste 2: Verificando se existe um 'sale_id'
    expect(response.body.sales[0]).toHaveProperty("sale_id");

    // Teste 3: Verificando se o campo 'amount' é igual a 20
    expect(response.body.sales[0].product.amount).toEqual(20);

    // Teste 4: Verificando se 'qrcode' não é nulo ou vazio na resposta
    expect(response.body.sales).toBeInstanceOf(Array);
    if (response.body.sales.length > 0) {
      expect(response.body.sales[0]).toHaveProperty("qrcode");
      expect(response.body.sales[0].qrcode).toBeTruthy(); // Verifica se não é nulo ou vazio
    } else {
      throw new Error("Não há itens em 'sales' na resposta.");
    }
  });
});
