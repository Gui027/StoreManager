const { expect } = require("chai");

const sinon = require('sinon');

const connection = require('../../../models/connection');

const {
    getAllSalesModel,
    createSalesModel,
    updateSalesModel
} = require('../../../models/SalesModel');

describe('Testa funções de "sales" da camada "Model"', () => {
    const SALE_PRODUCTS = [
      {
        product_id: 1,
        quantity: 20,
      },
      {
        product_id: 3,
        quantity: 37,
      },
    ];
  
    describe('Testa o arquivo postSalesModel', () => {
      describe('Quando tenta criar uma nova venda', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
          sinon.stub(connection, 'query').resolves();
        });
  
        after(() => {
          connection.execute.restore();
          connection.query.restore();
        });
  
        it('É um objeto', async () => {
          const result = await createSalesModel(SALE_PRODUCTS);
          expect(result).to.be.an('object');
        });
  
        it('Contém chave "id" igual a 1', async () => {
          const result = await createSalesModel(SALE_PRODUCTS);
          expect(result.id).to.be.equals(1);
        });
  
        it('Contém chave "itemsSold" igual ao parametro passado', async () => {
          const result = await createSalesModel(SALE_PRODUCTS);
          expect(result.itemsSold).to.be.equals(SALE_PRODUCTS);
        });
      });
    });
    describe('Testa o arquivo getAllSalesModel', () => {
      const ALL_SALES = [[
        {
          "saleId": 1,
          "date": "2022-01-30T23:31:12.000Z",
          "product_id": 1,
          "quantity": 9
        },
        {
          "saleId": 2,
          "date": "2022-01-30T23:31:12.000Z",
          "product_id": 2,
          "quantity": 1
        },
      ]];
  
      const SALE_BY_ID = [[
        {
          "saleId": 1,
          "date": "2022-01-30T23:31:12.000Z",
          "product_id": 1,
          "quantity": 9
        },
      ]];
  
      before(() => {
        sinon.stub(connection, 'query').resolves(ALL_SALES);
        sinon.stub(connection, 'execute').resolves(SALE_BY_ID);
      });
  
      after(() => {
        connection.execute.restore();
        connection.query.restore();
      });
  
      describe('Quando tenta buscar vendas pelo id', () => {
        it('É um array com 1 elemento', async () => {
          const result = await getAllSalesModel(1);
          expect(result).to.be.an('array');
          expect(result.length).to.be.equals(1);
        });
      });
    });
    describe('Testa o arquivo updateSaleModel', () => {
      describe('Quando tenta atualizar a quantidade de uma venda', () => {
        before(() => {
          sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        });
  
        after(() => {
          connection.execute.restore();
        });
  
        it('É um objeto', async () => {
          const result = await updateSalesModel(1, 1, 10);
          expect(result).to.be.an('object');
        });
  
        it('Contém a chave "affectedRows"', async () => {
          const result = await updateSalesModel(1, 1, 10);
          expect(result).to.contains.keys('affectedRows');
        });
      });
    });
  });