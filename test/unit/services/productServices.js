const { expect } = require("chai");
const sinon = require('sinon');

const ProductsService = require('../../../services/getProductsService');
const ProductModel = require('../../../models/ProductModel');
const createProductService = require('../../../services/postProductService');
const { getAllProducts, getByIdProducts } = require('../../../services/getProductsService');

const productsMock = require('../../mocks/productsMock');

describe('Testa funções de "products" da camada "Service"', () => {
    describe('Testa arquivo postProductService', () => {
      const PRODUCTS = [
        {
          id: 1,
          name: "batata",
          quantity: 10
        },
        {
          id: 2,
          name: "cenoura",
          quantity: 10
        },
        {
          id: 3,
          name: "mandioca",
          quantity: 10
        }
      ];
  
      const NEW_PRODUCT = {
        id: 4,
        name: 'beterraba',
        quantity: 10
      };
  
      before(() => {
        sinon.stub(ProductModel, 'getAll').resolves(PRODUCTS);
        sinon.stub(ProductModel, 'createProduct').resolves(NEW_PRODUCT);
      });
  
      after(() => {
        ProductModel.getAll.restore();
        ProductModel.createProduct.restore();
      });
  
      describe('Quando tenta criar um produto passando um "name" que já existe', () => {
        it('É um objeto', async () => {
          const result = await createProductService('batata', 10);
          expect(result).to.be.an('object');
        });
  
        it('Contém a chave "code" igual a 409', async () => {
          const result = await createProductService('batata', 10);
          expect(result.code).to.be.equals(409);
        });
      });
  
      describe('Quando tenta criar um produto passando um "name" que não existe', () => {
        it('É um objeto', async () => {
          const result = await createProductService('beterraba', 10);
          expect(result).to.be.an('object');
        });
      });
    });
    describe('Testa o arquivo getProductsService', () => {
      const PRODUCTS = [
        {
          id: 1,
          name: "batata",
          quantity: 10
        },
        {
          id: 2,
          name: "cenoura",
          quantity: 10
        },
        {
          id: 3,
          name: "mandioca",
          quantity: 10
        }
      ];
  
      describe('Quando buscamos todos os produtos', () => {
        before(() => {
          sinon.stub(ProductModel, 'getAll').resolves(PRODUCTS);
        });
  
        after(() => {
            ProductModel.getAll.restore();
        });
  
        it('É um array', async () => {
          const result = await getAllProducts();
  
          expect(result).to.be.an('array');
        });
      });
  
      describe('Quando buscamos produtos pelo id', () => {
        before(() => {
          sinon.stub(ProductModel, 'getAll').resolves(PRODUCTS);
        });
  
        after(() => {
            ProductModel.getAll.restore();
        });
  
        it('É um object com id igual a 1', async () => {
          const result = await getByIdProducts(1);
  
          expect(result).to.be.an('object');
          expect(result.id).to.be.equals(1);
        });
      });
      
      describe('Quando a busca com id não retorna nenhum resultado', () => {
        before(() => {
          sinon.stub(ProductModel, 'getAll').resolves(PRODUCTS);
        });
  
        after(() => {
            ProductModel.getAll.restore();
        });
  
        it('É um object com id igual a 1', async () => {
          const result = await getByIdProducts(4);
  
          expect(result).to.be.an('object');
          expect(result.code).to.be.equals(404);
        });
      });
    });
});

describe('Services', () => {
    describe('SubscriberService', () => {
        describe('#getAll', () => {
            describe('Quando a tabela `products` não tiver dados!', () => {
                before(() => {
                    sinon.stub(ProductModel, 'getAll').resolves(productsMock.empty);
                });

                after(() => {
                    ProductModel.getAll.restore();
                });

                it('retorne uma array vazia', async () => {
                    const products = await ProductsService.getAllProducts();
                    expect(products).to.deep.eq(productsMock.empty);
                });
            });

            describe('Quando a tabela `products` tiver dados!', () => {
                before(() => {
                    sinon.stub(ProductModel, 'getAll').resolves(productsMock.full);
                });

                after(() => {
                    ProductModel.getAll.restore();
                });

                it('retorne os elementos esperados', async () => {
                    const products = await ProductsService.getAllProducts();
                    expect(products).to.deep.eq(productsMock.full);
                });
            });
        });
    });
});