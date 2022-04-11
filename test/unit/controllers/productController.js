const { expect } = require('chai');
const sinon = require('sinon');

const GetProductController = require('../../../controllers/getProductController');
const PostProductController = require('../../../controllers/postProductsController');
const PutProductController = require('../../../controllers/putProductsController');
const GetProductService = require('../../../services/getProductsService');
const PostProductService = require('../../../services/postProductService');
const PutProductService = require('../../../services/putProductsService');

const ProductModel = require('../../../models/ProductModel');

const { full } = require('../../mocks/productsMock');

const productsMock = require('../../mocks/productsMock');
const ProductController = require('../../../controllers/getProductController');
const CreateController = require('../../../controllers/postProductsController');
const ProductsService = require('../../../services/getProductsService');
const CreateService = require('../../../services/postProductService');
const DeleteProducts = require('../../../services/deleteProductService');
const DeleteProductsController = require('../../../controllers/deleteProductController');

// describe('Product Controller', () => {
//   const fakeProduct = {
//     name: 'Produto A',
//     quantity: 10,
//   };

//   const allProductsDb = [
//     {
//       id: 1,
//       name: "Martelo de Thor",
//       quantity: 10,
//     },
//     {
//       id: 2,
//       name: "Traje de encolhimento",
//       quantity: 20,
//     },
//     {
//       id: 3,
//       name: "Escudo do Capitão América",
//       quantity: 30,
//     },
//   ]

//   const res = {};
//   const req = {};

//   before(() => {
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns();
//   })

//   describe('produto criado com sucesso', () => {
//     before(() => {
//       sinon.stub(PostProductService, 'alreadyExist').resolves(fakeProduct);
//       req.body = fakeProduct;
//     });
//     after(() => {
//         PostProductService.alreadyExist.restore();
//       req.body = undefined;
//     });

//     it('valida criação de produto', async () => {
//       await PostProductController.postProduct(req, res);

//       expect(res.status.calledWith(201)).to.be.equals(true);
//       expect(res.json.calledWith(fakeProduct)).to.be.equals(true);
//     });
//   })
//   describe('verifica busca por todos os produtos', () => {
//     before(() => {
//       sinon.stub(GetProductService, 'getAllProducts').resolves(allProductsDb);
//     })
//     after(() => {
//         GetProductService.getAllProducts.restore();
//     })
//     it('retorna todos os produtos', async () => {
//       await GetProductController.getAll(req, res);

//       expect(res.status.calledWith(201)).to.be.equal(true);
//       expect(res.json.calledWith(allProductsDb)).to.be.equal(true);
//     })
//   })
// })

// const { expect } = require("chai");
// const sinon = require('sinon');
// const productsMock = require('../../mocks/productsMock');
// const ProductController = require('../../../controllers/getProductController');
// const CreateController = require('../../../controllers/postProductsController');
// const ProductsService = require('../../../services/getProductsService');
// const CreateService = require('../../../services/postProductService');

describe('Controller', () => {
  describe('ProductController', () => {
    describe('#getAll', () => {
            describe('Quando a tabela `products` não possui dados', () => {
                const req = {};
                const res = {};

                before(() => {
                    res.status = sinon.stub().returns(res);
                    res.json = sinon.stub();

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

            sinon.stub(CreateService, 'alreadyExist').resolves(productsMock.inserted);
        });

        after(() => {
            CreateService.alreadyExist.restore();
        })

        it('deve chamar `res.status` com o valor 201', async () => {
            await CreateController.postProduct(req, res);
            expect(res.status.calledWith(201)).to.be.true;
        });

        it('deve chamar `res.json` com o objeto cadastrado', async () => {
            await CreateController.postProduct(req, res);
            expect(res.status.calledWith(productsMock.inserted)).to.be.true;
        })
    });

    describe('#deleteProducts', () => {

      const req = {};
      const res = {};

      describe('Quando nao for deletado o produto', () => {
        it('deve chamar res.status = 404 valor Product not found', async () => {

          req.params = { id: 25 };

          res.status = sinon.stub().returns(res);
          res.json = sinon.stub();

          sinon.stub(ProductsService, 'getByIdProducts').resolves(false);
          sinon.stub(DeleteProducts, 'deleteProductById').resolves();

          await DeleteProductsController.deleteProduct(req, res);

          expect(res.status.calledWith(404)).to.be.true;
          expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;

          DeleteProducts.deleteProductById.restore();
          ProductsService.getByIdProducts.restore();

        })
      })

      describe('Quando for deletado o produto', () => {
        it('deve chamar res.status = 204', async () => {

          req.params = { id: 1 };

          res.status = sinon.stub().returns(res);
          res.end = sinon.stub();

          sinon.stub(ProductsService, 'getByIdProducts').resolves(true);
          sinon.stub(DeleteProducts, 'deleteProductById').resolves();

          await DeleteProductsController.deleteProduct(req, res);

          expect(res.status.calledWith(204)).to.be.true;
          expect(res.end.called).to.be.true;

          DeleteProducts.deleteProductById.restore();
          ProductsService.getById.restore();

        })
      })
    })
  });
});