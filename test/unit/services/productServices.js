const { expect } = require("chai");
const sinon = require('sinon');

const ProductsService = require('../../../services/ProductsService');
const ProductModel = require('../../../models/ProductModel');

const productsMock = require('../../mocks/productsMock');

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
                    const products = await ProductsService.getAll();
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
                    const products = await ProductsService.getAll();
                    expect(products).to.deep.eq(productsMock.full);
                });
            });
        });
    });
});