require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { getAll, getById } = require('./controllers/getProductController');
const { getAllS, getByIdS } = require('./controllers/getSalesController');
const { validateName, validateQuantity } = require('./middlewares/ProductsValidation');
const { validateProductId, validateQuantitySales } = require('./middlewares/SalesValidation');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAll);

app.get('/products/:id', getById);

app.get('/sales', getAllS);

app.get('/sales/:id', getByIdS);

app.post('/products', validateName, validateQuantity);

app.post('/sales', validateProductId, validateQuantitySales);

app.put('/products', validateName, validateQuantity);

app.put('/sales', validateProductId, validateQuantitySales);

app.listen(process.env.PORT, () => {
console.log(`Escutando na porta ${process.env.PORT}`);
});