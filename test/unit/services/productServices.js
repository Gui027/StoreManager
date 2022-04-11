const { expect } = require('chai');
const sinon = require('sinon');

const DeleteProductService = require('../../../services/deleteProductService');
const ProductsService = require('../../../services/getProductsService');
const ProductModel = require('../../../models/ProductModel');

const productsMock = require('../../mocks/productsMock');

const { full } = require('../../mocks/productsMock');

describe('Services', () => {
  describe('ProductService', () => {
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

    describe('#create', () => {
          before(() => {
            sinon.stub(ProductModel, 'createProduct').resolves(productsMock.inserted);
          })

          after(() => {
            ProductModel.createProduct.restore();
          })

          it('deve retornar um objeto com os atributos id, name e quantity', async () => {
            const { name, quantity } = productsMock.inserted;
            const product = await createProductService.alreadyExist({ name, quantity });
            expect(product).to.deep.eq(productsMock.inserted);
          })
    })

    describe('#deleteProducts', () => {
          describe('Quando deleta um produto', () => {
            it('não retorna nada', async () => {
    
              const idDeleted = 1;
    
              sinon.stub(ProductModel, 'deleteProduct').resolves()
    
              const products = await DeleteProductService.deleteProductById(idDeleted);
              expect(products).to.deep.eq(undefined);
    
              ProductModel.deleteProduct.restore();
    
            })
          })
    });
  });
});
