const supertest = require('supertest');

// Defina a URL base para as requisições
const gatewayApiUrl = 'https://api.gateway.greenn.com.br';
const paymentApiUrl = 'https://apipay.greenn.com.br';

describe('Payment API Tests', () => {
    let cardId; // Variável para armazenar o ID do cartão criado

    // Teste 1: Criar o cartão no gateway
    it('should create a card in the gateway', async () => {
        const response = await supertest(gatewayApiUrl)
            .post('/api/checkout/card')
            .set({
                'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
                'sec-ch-ua-mobile': '?0',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'content-type': 'application/json',
                'accept': 'application/json',
                'Referer': 'https://payfast.greenn.com.br/',
                'x-greenn-gateway': 'f0ef6be8fbfd64865885d99d3d3295a778142',
                'sec-ch-ua-platform': '"Linux"'
            })
            .send({
                "system": "CHECKOUT",
                "gateway": "PAGARME",
                "card": {
                    "holder_name": "Tanielson s Moura",
                    "number": "5555555555554444",
                    "exp_month": "04",
                    "exp_year": "25",
                    "cvv": "079",
                    "costumer": {
                        "external_id": "null",
                        "name": "Tanielson moura",
                        "phone": "+554444444444",
                        "email": "teste@mail.com",
                        "document_number": "70795204108",
                        "document_type": "cpf",
                        "document": {
                            "type": "cpf",
                            "number": "70795204108",
                            "document_type": "cpf",
                            "document_number": "70795204108"
                        }
                    }
                }
            });
        
        expect(response.status).toBe(200);
        cardId = response.body.card_id; // Supondo que a resposta inclua um 'card_id'
    });

    // Teste 2: Realizar o pagamento
    it('should make a payment', async () => {
        const response = await supertest(paymentApiUrl)
            .post('/api/payment')
            .set({
                'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
                'wd-token-': '{{wd}}', // Substitua {{wd}} pelo token real necessário
                'sec-ch-ua-mobile': '?0',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'content-type': 'application/json',
                'accept': 'application/json',
                'Referer': 'https://payfast.greenn.com.br/',
                'sec-ch-ua-platform': '"Linux"'
            })
            .send({
                "method": "CREDIT_CARD",
                "amount": 20,
                "total": 20,
                "installments": "1",
                "product_id": "35008",
                "products": [
                    {
                        "product_id": 35008,
                        "product_offer": "aRAism"
                    }
                ],
                "name": "Tanielson moura",
                "email": "teste@mail.com",
                "cellphone": "+554444444444",
                "document": "707.952.041-08",
                "uuid": "ad1abbd0-ec84-45e9-878f-b37f20f4e544",
                "country_code": "BR",
                "zipcode": null,
                "street": "",
                "number": 0,
                "complement": "",
                "neighborhood": "",
                "city": "",
                "state": "",
                "language": "pt",
                "metas": {},
                "captcha": "CAPTCHA_KEY", // Substitua "CAPTCHA_KEY" pelo valor real do captcha, se necessário
                "cards": [
                    {
                        "id": cardId, // Usamos o cardId armazenado do teste anterior
                        "customer": null,
                        "amount": "20.00",
                        "total": "20.00"
                    }
                ],
                "currency_data": {
                    "local_currency": "BRL",
                    "base_currency": "BRL"
                },
                "gateway": "PAGARME",
                "client_id": null
            });

        expect(response.status).toBe(200);
    });
});
