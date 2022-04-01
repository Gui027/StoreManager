const { expect } = require("chai");

const sinon = require('sinon');

const productsMock = require('../../mocks/productsMock');
const ProductsModel = require('../../../models/ProductModel');
const connection = require('../models/connection');

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
                    expect(subscribers).to.deep.equal(productsMock.full);
                })
            })
        })
    })
});