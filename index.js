const express = require('express');
const { json } = require('body-parser');
const productRouter = require('./controllers/routerProduct');
const saleRouter = require('./controllers/routerSale');
const error = require('./middlewares/error');

const PORT = 3000;

const app = express();

app.use(json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

app.use('/sales', saleRouter);

app.use(error);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
