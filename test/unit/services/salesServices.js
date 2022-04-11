const { expect } = require('chai');
const sinon = require('sinon');

const GetSaleService = require('../../../services/getSalesServices');
const SaleModels = require('../../../models/SalesModel');

describe('Sale Services', () => {
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
    },
    {
      saleId: 2,
      date: "2022-04-04T00:41:29.000Z",
      productId: 1,
      quantity: 10
    }
  ]

  describe('venda criada com sucesso', () => {
    before(() => {
    //   sinon.stub(SaleModels, 'createSale').resolves(fakeSale);
      sinon.stub(SaleModels, 'getAllSalesModel').resolves(getAllSales);
      sinon.stub(SaleModels, 'getAllSalesModel').resolves(fakeGetSale);
    })

    after(() => {
    //   SaleModels.createSale.restore();
      SaleModels.getAllSalesModel.restore();
      SaleModels.getAllSalesModel.restore();
    })

    // it('verifica criação de venda com sucesso', async () => {
    //   const result = await SaleService.createSale(fakeSale);

    //   expect(result.id).to.be.equals(fakeSale.id);
    //   expect(result.itemsSold).to.be.equals(fakeProductSold);
    // })

    it('verifica busca de vendas por id', async () => {
      const result = await GetSaleService.getSalesById(fakeGetSale.saleId);

      expect(result).to.be.equals(fakeGetSale);
    })

    it('verifica a busca por todas as vendas', async () => {
      const result = await GetSaleService.getAllSales(getAllSales);

      expect(result).to.be.equals(getAllSales);
    })
  })
})