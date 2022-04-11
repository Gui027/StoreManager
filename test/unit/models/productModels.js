const { expect } = require("chai");

const sinon = require('sinon');

const productsMock = require('../../mocks/productsMock');
const ProductsModel = require('../../../models/ProductModel');
const SalesModel = require('../../../models/SalesModel');
const connection = require('../models/connection');
const {
    createProduct,
    getAll,
    putProduct,
    deleteProduct,
} = require('../../../models/ProductModel');

const {
    getAllSalesModel,
} = require('../../../models/SalesModel');

describe('Models', () => {
    describe('productModel', () => {
        describe('#getAll', () => {
            describe('Quando a tabela `products` não tiver dados!', () => {
                before(() => {
                    sinon.stub(connection, 'execute').resolves([productsMock.empty]);
                });

                after(() => {
                    connection.execute.restore();
                })

                it('retornar uma array vazia', async () => {
                    const products = await ProductsModel.getAll();
                    expect(products).to.be.deep.eq([productsMock.empty]);
                })
            });

            describe('Quando a tabela `products` tiver dados!', () => {
                before(() => {
                    sinon.stub(connection, 'execute').resolves([productsMock.full])
                });

                after(() => {
                    connection.execute.restore();
                });

                it('deve retornar os elementos esperados', async () => {
                    const products = await ProductsModel.getAll();
                    expect(products).to.deep.equal(productsMock.full);
                })
            })

            describe('Testa funções de "products" da camada "Model"', () => {
                const LIST_OF_PRODUCTS = [
                  [
                    {
                      id: 1,
                      name: 'batata',
                      quantity: 10,
                    },
                    {
                      id: 2,
                      name: 'cenoura',
                      quantity: 20,
                    },
                  ],
                ];
              
                describe('Testa arquivo postProductModel', () => {
                  before(() => {
                    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]); 
                  });
                  after(() => {
                    connection.execute.restore();
                  });
              
                  describe('Quando tenta criar um novo produto passando os parametros', () => {
                    it('É um objeto', async () => {
                      const result = await createProduct('batata', 10);
                      expect(result).to.be.an('object');
                    });
              
                    it('Contém a chave id igual a 1', async () => {
                      const result = await createProduct('batata', 10);
                      expect(result.id).to.be.equals(1);
                    });
                  });
                });
              
                describe('Testa o arquivo getProductsModel', () => {
                  describe('Quando tentar listar todos os produtos', () => {
                    before(() => {
                      sinon.stub(connection, 'execute').resolves(LIST_OF_PRODUCTS);
                    });
              
                    it('É um array', async () => {
                      const result = await getAll();
                      expect(result).to.be.an('array');
                    });
              
                    it('Contém 2 elementos dentro do array', async () => {
                      const result = await getAll();
                      expect(result.length).to.be.equals(2);
                    });
              
                    after(() => {
                      connection.execute.restore();
                    })
                  });
                });
              
                describe('Testa o arquivo putProduct', () => {
                  describe('Quando tenta atualizar um produto', () => {
                    before(() => {
                      sinon.stub(connection, 'execute').resolves();
                    });
              
                    it('É um objeto', async () => {
                      const result = await putProduct(1, 'beterraba', 50);
                      expect(result).to.be.a('object');
                    });
              
                    it('Contém a chave id igual ao primeiro parametro', async () => {
                      const result = await putProduct(1, 'beterraba', 50);
                      expect(result.id).to.be.equals(1);
                    });
              
                    it('Contém a chave name igual ao segundo parametro', async () => {
                      const result = await putProduct(1, 'beterraba', 50);
                      expect(result.name).to.be.equals('beterraba');
                    });
              
                    it('Contém a chave quantity igual ao terceiro parametro', async () => {
                      const result = await putProduct(1, 'beterraba', 50);
                      expect(result.quantity).to.be.equals(50);
                    });
              
                    after(() => {
                      connection.execute.restore();
                    })
                  });
                });

                describe('Testa o arquivo deleteProduct', () => {
                  describe('Quando tenta deletar um produto', () => {
                    before(() => {
                      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
                    });
              
                    after(() => {
                      connection.execute.restore();
                    });
              
                    it('É um objeto', async () => {
                      const result = await deleteProduct(1);
                      expect(result).to.be.a('object');
                    });
              
                    it('Contém a chave "affectedRows" igual a 1', async () => {
                      const result = await deleteProduct(1);
                      expect(result.affectedRows).to.be.equals(1);
                    });
                  });
                });
              });
              
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
              
                // describe('Testa o arquivo postSalesModel', () => {
                //   describe('Quando tenta criar uma nova venda', () => {
                //     before(() => {
                //       sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
                //       sinon.stub(connection, 'query').resolves();
                //     });
              
                //     after(() => {
                //       connection.execute.restore();
                //       connection.query.restore();
                //     });
              
                //     it('É um objeto', async () => {
                //       const result = await createSaleModel(SALE_PRODUCTS);
                //       expect(result).to.be.an('object');
                //     });
              
                //     it('Contém chave "id" igual a 1', async () => {
                //       const result = await createSaleModel(SALE_PRODUCTS);
                //       expect(result.id).to.be.equals(1);
                //     });
              
                //     it('Contém chave "itemsSold" igual ao parametro passado', async () => {
                //       const result = await createSaleModel(SALE_PRODUCTS);
                //       expect(result.itemsSold).to.be.equals(SALE_PRODUCTS);
                //     });
                //   });
                // });
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
              
                  describe('Quando tenta buscar todas a vendas', () => {
                    it('É um array com 2 elementos', async () => {
                      const result = await SalesModel.getAllSalesModel();
                      expect(result).to.be.an('array');
                      expect(result.length).to.be.equals(2);
                    });
                  });
              
                  describe('Quando tenta buscar vendas pelo id', () => {
                    it('É um array com 1 elemento', async () => {
                      const result = await SalesModel.getAllSalesModel(1);
                      expect(result).to.be.an('array');
                      expect(result.length).to.be.equals(1);
                    });
                  });
                });
                // describe('Testa o arquivo updateSaleModel', () => {
                //   describe('Quando tenta atualizar a quantidade de uma venda', () => {
                //     before(() => {
                //       sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
                //     });
              
                //     after(() => {
                //       connection.execute.restore();
                //     });
              
                //     it('É um objeto', async () => {
                //       const result = await updateSalesModel(1, 1, 10);
                //       expect(result).to.be.an('object');
                //     });
              
                //     it('Contém a chave "affectedRows"', async () => {
                //       const result = await updateSalesModel(1, 1, 10);
                //       expect(result).to.contains.keys('affectedRows');
                //     });
                //   });
                // });
              });
        });

        describe('#create', () => {
          before(() => {
            sinon.stub(connection, 'execute').resolves([{ insertId: productsMock.inserted.id }])
          });

          after(() => {
            connection.execute.restore();
          })

          it('deve retornar um objeto com os atributos id, name, email', async () => {
            const { name, quantity } = productsMock.inserted;
            const product = await ProductsModel.createProduct({ name, quantity });
            expect(product).to.deep.eq(productsMock.inserted);
          })
        })
    })
});