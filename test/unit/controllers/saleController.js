const { expect } = require('chai');
const sinon = require('sinon');

const Controller = require('../../../controllers/Controllers');
const Services = require('../../../services/Services');

describe('Sale Controller', () => {
  const fakeProductSold = [
    {
      productId: 1,
      quantity: 10
    }
  ]

  const fakeSale = {
    id: 4,
    itemsSold: fakeProductSold
  };

  const fakeGetSale = {
		saleId: 1,
		date: "2022-04-04T00:41:29.000Z",
		productId: 1,
		quantity: 10
	}

  const getAllSales = [
    {
      saleId: 1,
      date: "2022-04-04T00:41:29.000Z",
      productId: 1,
      quantity: 10
    }
  ]

  const res = {};
  const req = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  })

  describe('create sales', () => {
    before(() => {
      sinon.stub(Services, 'postSalesService').resolves(fakeSale);
      req.body = fakeProductSold;
    })

    after(() => {
      Services.postSalesService.restore();
      req.body = undefined;
    })

    it('verifica criação de venda com sucesso', async () => {
      await Controller.postSalesController(req, res);

      expect(res.status.calledWith(201)).to.be.equals(true)
      expect(res.json.calledWith(fakeSale)).to.be.equals(true);
    });
  })
  describe('verifica requisição de busca para todas as vendas', () => {
    before(() => {
      sinon.stub(Services, 'getAllSales').resolves(getAllSales);
    })
    after(() => {
      Services.getAllSales.restore();
    })
    it('retorna vendas', async () => {
      await Controller.getAllS(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(getAllSales)).to.be.equal(true);
    })
  })
})