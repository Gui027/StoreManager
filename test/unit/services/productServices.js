const { expect } = require('chai');
const sinon = require('sinon');

const GetProductService = require('../../../services/getProductsService');
const PostProductService = require('../../../services/postProductService');
const PutProductService = require('../../../services/putProductsService');
const DeleteProductService = require('../../../services/deleteProductService');

const ProductsService = require('../../../services/getProductsService');
const ProductModel = require('../../../models/ProductModel');
const ProductServiceCreate = require('../../../services/postProductService');
const { getAllProducts, getByIdProducts } = require('../../../services/getProductsService');
const { alreadyExist, validateName } = require('../../../services/postProductService');

const productsMock = require('../../mocks/productsMock');

const { full } = require('../../mocks/productsMock');

// const ProductModels = require('../../../models/ProductModel');

// describe('Product Service', () => {
//   const fakeProduct = {
//     name: 'Produto A',
//     quantity: 10,
//   };

//   const dbProducts = [
//     {
//       id: 1,
//       name: 'Produto B',
//       quantity: 2
//     },
//     {
//       id: 2,
//       name: 'Produto C',
//       quantity: 2
//     }
//   ]

//   describe('produto criado com sucesso', () => {
//     before(() => {
//       sinon.stub(ProductModels, 'createProduct').resolves(fakeProduct)
//       sinon.stub(ProductModels, 'getAll').resolves(dbProducts)
//       sinon.stub(GetProductService, 'getByIdProducts').resolves(fakeProduct);
//       sinon.stub(ProductModels, 'putProduct').resolves(fakeProduct);
//     });
//     after(() => {
//       ProductModels.createProduct.restore();
//       ProductModels.getAll.restore();
//     });

//     it('valida criação de produto', async () => {
//       const result = await PostProductService.alreadyExist(fakeProduct);

//       expect(result.name).to.be.equals('Produto A');
//       expect(result.quantity).to.be.equals(10);
//     })

//     it('valida requisição de busca por todos os produtos', async () => {
//       const result = await GetProductService.getAllProducts(dbProducts);

//       expect(result.length).to.be.equals(2);
//     })

//     it('valida busca por id do produto', async () => {
//       const result = await GetProductService.getByIdProducts(fakeProduct.id);

//       expect(result).to.be.equal(fakeProduct);
//     })

//     it('valida update de produto', async () => {
//       const result = await PutProductService.updateProductService(fakeProduct);

//       expect(result).to.be.equals(fakeProduct);
//     })
//   })
// })

// const { expect } = require("chai");
// const sinon = require('sinon');

// const ProductsService = require('../../../services/getProductsService');
// const ProductModel = require('../../../models/ProductModel');
// const ProductServiceCreate = require('../../../services/postProductService');
// const { getAllProducts, getByIdProducts } = require('../../../services/getProductsService');
// const { alreadyExist, validateName } = require('../../../services/postProductService');

// const productsMock = require('../../mocks/productsMock');

// describe('Testa funções de "products" da camada "Service"', () => {
//     describe('Testa arquivo postProductService', () => {
//       const PRODUCTS = [
//         {
//           id: 1,
//           name: "batata",
//           quantity: 10
//         },
//         {
//           id: 2,
//           name: "cenoura",
//           quantity: 10
//         },
//         {
//           id: 3,
//           name: "mandioca",
//           quantity: 10
//         }
//       ];
  
//       const NEW_PRODUCT = {
//         id: 4,
//         name: 'beterraba',
//         quantity: 10
//       };
  
//       before(() => {
//         sinon.stub(ProductModel, 'getAll').resolves(PRODUCTS);
//         sinon.stub(ProductModel, 'createProduct').resolves(NEW_PRODUCT);
//       });
  
//       after(() => {
//         ProductModel.getAll.restore();
//         ProductModel.createProduct.restore();
//       });
  
//       describe('Quando tenta criar um produto passando um "name" que já existe', () => {
//         it('É um objeto', async () => {
//           const result = await ProductServiceCreate.alreadyExist('batata', 10);
//           expect(result).to.be.an('object');
//         });
  
//         it('Contém a chave "code" igual a 409', async () => {
//           const result = await ProductServiceCreate.alreadyExist('batata', 10);
//           expect(result.code).to.be.equals(409);
//         });
//       });
  
//       describe('Quando tenta criar um produto passando um "name" que não existe', () => {
//         it('É um objeto', async () => {
//           const result = await ProductServiceCreate.alreadyExist('beterraba', 10);
//           expect(result).to.be.an('object');
//         });
//       });
//     });
//     describe('Testa o arquivo getProductsService', () => {
//       const PRODUCTS = [
//         {
//           id: 1,
//           name: "batata",
//           quantity: 10
//         },
//         {
//           id: 2,
//           name: "cenoura",
//           quantity: 10
//         },
//         {
//           id: 3,
//           name: "mandioca",
//           quantity: 10
//         }
//       ];
  
//       describe('Quando buscamos todos os produtos', () => {
//         before(() => {
//           sinon.stub(ProductModel, 'getAll').resolves(PRODUCTS);
//         });
  
//         after(() => {
//             ProductModel.getAll.restore();
//         });
  
//         it('É um array', async () => {
//           const result = await ProductsService.getAllProducts();
  
//           expect(result).to.be.an('array');
//         });
//       });
  
//       describe('Quando buscamos produtos pelo id', () => {
//         before(() => {
//           sinon.stub(ProductModel, 'getAll').resolves(PRODUCTS);
//         });
  
//         after(() => {
//             ProductModel.getAll.restore();
//         });
  
//         it('É um object com id igual a 1', async () => {
//           const result = await ProductsService.getByIdProducts(1);
  
//           expect(result).to.be.an('object');
//           expect(result.id).to.be.equals(1);
//         });
//       });
      
//       describe('Quando a busca com id não retorna nenhum resultado', () => {
//         before(() => {
//           sinon.stub(ProductModel, 'getAll').resolves(PRODUCTS);
//         });
  
//         after(() => {
//             ProductModel.getAll.restore();
//         });
  
//         it('É um object com id igual a 1', async () => {
//           const result = await ProductsService.getByIdProducts(4);
  
//           expect(result).to.be.an('object');
//           expect(result.code).to.be.equals(404);
//         });
//       });
//     });
// });

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
