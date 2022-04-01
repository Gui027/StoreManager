const { assert, expect } = require("chai");
const sinon = require('sinon');
const productsMock = require('../../mocks/productsMock');
const ProductController = require('../../../controllers/ProductController');
const ProductsService = require('../../../services/ProductsService');
const { expectationFailed } = require("@hapi/boom");

describe('Controller', () => {
    describe('ProductController', () => {
        describe('#getAll', () => {
            describe('Quando a tabela `products` não possui dados', () => {
                const req = {};
                const res = {};

                before(() => {
                    res.status = sinon.stub().returns(res);
                    res.json = sinon.stub();

                    sinon.stub(ProductsService, 'getAll').resolves(productsMock.empty);
                });

                after(() => {
                    ProductsService.getAll.restore();
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

                    sinon.stub(ProductsService, 'getAll').resolves(productsMock.full);
                });

                after(() => {
                    ProductsService.getAll.restore();
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
    });
});