const { expect } = require('chai');
const sinon = require('sinon');

const productsMock = require('../../mocks/productsMock');
const ProductController = require('../../../controllers/Controllers');
const ProductsService = require('../../../services/Services');


describe('Controller', () => {
  describe('ProductController', () => {
    describe('#getAll', () => {
            describe('Quando a tabela `products` não possui dados', () => {
                const req = {};
                const res = {};

                before(() => {
                    res.status = sinon.stub().returns(res);
                    res.json = sinon.stub().returns(productsMock.empty);

                    sinon.stub(ProductsService, 'getAllProducts').resolves(productsMock.empty);
                });

                after(() => {
                    ProductsService.getAllProducts.restore();
                });

                it('deve chamar a função `res.status` com o valor 200', async () => {
                    await ProductController.getAll(req, res);
                    expect(res.status.calledWith(200)).to.be.true;
                });

                it('deve chamar a função `res.json` com uma array vazia', async () => {
                    await ProductController.getAll(req, res);
                    expect(res.json.calledWith(productsMock.empty)).to.be.true;
                });

            });

            describe('Quando a tabela `products` possuir dados', () => {
                const req = {};
                const res = {};

                before(() => {
                    res.status = sinon.stub().returns(res);
                    res.json = sinon.stub();

                    sinon.stub(ProductsService, 'getAllProducts').resolves(productsMock.full);
                });

                after(() => {
                    ProductsService.getAllProducts.restore();
                });

                it('deve chamar `res.status` com o valor 200', async () => {
                    await ProductController.getAll(req, res);
                    expect(res.status.calledWith(200)).to.be.true;
                });

                it('deve chamar a função `res.json` com os elementos esperados', async () => {
                    await ProductController.getAll(req, res);
                    expect(res.json.calledWith(productsMock.full)).to.be.true;
                })
            });
    });

    describe('#create', () => {
        const req = {};
        const res = {};

        before(() => {
            const { name, quantity } = productsMock.inserted;
            req.body = { name, quantity };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub();

            sinon.stub(ProductsService, 'postProductService').resolves(productsMock.inserted);
        });

        after(() => {
            ProductsService.postProductService.restore();
        })

        it('deve chamar `res.status` com o valor 201', async () => {
            await ProductController.postProductsController(req, res);
            expect(res.status.calledWith(201)).to.be.true;
        });

        it('deve chamar `res.json` com o objeto cadastrado', async () => {
            await ProductController.postProductsController(req, res);
            expect(res.json.calledWith(productsMock.inserted)).to.be.true;
        })
    });

    describe('#delete', () => {

      describe('product was deleted', () => {
        const response = {};
        const request = { 
          params: { id: 1 },
        };
        before(() => {
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns();
            response.end = sinon.stub().returns();
          sinon.stub(ProductsService, 'deleteProductService').resolves(productsMock.inserted);
        })
  
        after(() => ProductsService.deleteProductService.restore());
  
        it('return status 204', async () => {
          await ProductController.deleteProductController(request, response);
          expect(response.status.calledWith(204)).to.be.equal(true)
        });
      });
    })

    describe('#update', () => {
        describe('product was updated', () => {
            
            const response = {};
            const request = { 
              body: productsMock.novoProduto,
              params: { id: 1 },
            };

            before(() => {
              response.status = sinon.stub().returns(response);
              response.json = sinon.stub().returns();
              sinon.stub(ProductsService, 'putProductsService').resolves(productsMock.inserted)
            })
      
            after(() => ProductsService.putProductsService.restore());
      
            it('return status 200', async () => {
              await ProductController.putProductsController(request, response);
              expect(response.status.calledWith(200)).to.be.equal(true)
            });

            it('return json with product', async () => {
              await ProductController.putProductsController(request, response);
              expect(response.json.calledWith(productsMock.inserted)).to.be.equal(true)
            });
          });
    })
  });
});