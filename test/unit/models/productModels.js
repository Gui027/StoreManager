const { expect } = require("chai");

const sinon = require('sinon');

const productsMock = require('../../mocks/productsMock');
const productModel = require('../../../models/ProductModel');
const connection = require('../../../models/connection');
// const {
//     createProduct,
//     getAll,
//     putProduct,
//     deleteProduct,
// } = require('../../../models/ProductModel');

describe('Models', () => {
    describe('productModel', () => {
        describe('#getAll', () => {
            
          describe('Quando a tabela `products` tiver dados!', () => {
                before(() => {
                    sinon.stub(connection, 'execute').resolves([productsMock.full])
                });

                after(() => {
                    connection.execute.restore();
                });

                it('deve retornar os elementos esperados', async () => {
                    const products = await productModel.getAll();
                    expect(products).to.deep.equal(productsMock.full);
                })
            })

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
                      const result = await productModel.createProduct('batata', 10);
                      expect(result).to.be.an('object');
                    });
              
                    it('Contém a chave id igual a 1', async () => {
                      const result = await productModel.createProduct('batata', 10);
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
                      const result = await productModel.getAll();
                      expect(result).to.be.an('array');
                    });
              
                    it('Contém 2 elementos dentro do array', async () => {
                      const result = await productModel.getAll();
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
                      const result = await productModel.putProduct(1, 'beterraba', 50);
                      expect(result).to.be.a('object');
                    });
              
                    it('Contém a chave id igual ao primeiro parametro', async () => {
                      const result = await productModel.putProduct(1, 'beterraba', 50);
                      expect(result.id).to.be.equals(1);
                    });
              
                    it('Contém a chave name igual ao segundo parametro', async () => {
                      const result = await productModel.putProduct(1, 'beterraba', 50);
                      expect(result.name).to.be.equals('beterraba');
                    });
              
                    it('Contém a chave quantity igual ao terceiro parametro', async () => {
                      const result = await productModel.putProduct(1, 'beterraba', 50);
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
                      const result = await productModel.deleteProduct(1);
                      expect(result).to.be.a('object');
                    });
              
                    it('Contém a chave "affectedRows" igual a 1', async () => {
                      const result = await productModel.deleteProduct(1);
                      expect(result.affectedRows).to.be.equals(1);
                    });
                  });
                });
        });
    })
});