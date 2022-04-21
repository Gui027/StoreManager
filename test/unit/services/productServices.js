const { expect } = require('chai');
const sinon = require('sinon');

const ProductsService = require('../../../services/Services');
const ProductModel = require('../../../models/ProductModel');

const productsMock = require('../../mocks/productsMock');

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
    })

    describe('#create', () => {
      describe('produto criado com sucesso', () => {
        before(() => {
          sinon.stub(ProductModel, 'createProduct').resolves(productsMock.novoProduto)
          sinon.stub(ProductModel, 'getAll').resolves(productsMock.full)
          
        });
        after(() => {
          ProductModel.createProduct.restore();
          ProductModel.getAll.restore();
        });

        it('valida criação de produto', async () => {
          const result = await ProductsService.postProductService(productsMock.novoProduto);

          expect(result.name).to.be.equals('produto A');
          expect(result.quantity).to.be.equals(10);
        })
        });
    })

    describe('#deleteProducts', () => {
          describe('A função de Deletar', () => {
            before(() => {
              sinon.stub(ProductModel, 'deleteProduct').resolves(1);
              sinon.stub(ProductModel, 'getById').resolves(productsMock.inserted);
            });
        
            after(() => {
              ProductModel.deleteProduct.restore();
              ProductModel.getById.restore();
            });  
        
            it('Deve deletar o produto do id passado', async () => {
              const product = await ProductsService.deleteProductService(1);
              expect(product).to.be.deep.equal(productsMock.inserted);
            });
          });
    });
    
  });
});
