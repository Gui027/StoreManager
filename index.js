require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { getAll, getById } = require('./controllers/getProductController');
const { getAllS, getByIdS } = require('./controllers/getSalesController');
const { validateName, validateQuantity } = require('./middlewares/ProductsValidation');
const { validateProductId, validateQuantitySales } = require('./middlewares/SalesValidation');
const postProductController = require('./controllers/postProductsController');
const putProductsController = require('./controllers/putProductsController');
const deleteProductController = require('./controllers/deleteProductController');
const postSalesController = require('./controllers/postSalesController');
const putUpdateSales = require('./controllers/updateSalesController');
const deleteSalesController = require('./controllers/deleteSaleController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAll);

app.get('/products/:id', getById);

// app.put('/products', validateName, validateQuantity);

app.put('/products/:id', validateName, validateQuantity, putProductsController);

app.delete('/products/:id', deleteProductController);

app.post('/sales', validateProductId, validateQuantitySales, postSalesController);

app.get('/sales', getAllS);

app.get('/sales/:id', getByIdS);

app.post('/products', validateName, validateQuantity, postProductController);

app.put('/sales', validateProductId, validateQuantitySales);

app.put('/sales/:id', validateProductId, validateQuantitySales, putUpdateSales);

app.delete('/sales/:id', deleteSalesController);

app.listen(process.env.PORT, () => {
console.log(`Escutando na porta ${process.env.PORT}`);
});