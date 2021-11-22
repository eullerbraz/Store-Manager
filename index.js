const express = require('express');
const { json } = require('body-parser');
const products = require('./controllers/products');
const sales = require('./controllers/sales');
const error = require('./middlewares/error');

const PORT = 3000;

const app = express();

app.use(json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', products.create);

app.get('/products', products.getAll);

app.get('/products/:id', products.findById);

app.put('/products/:id', products.update);

app.delete('/products/:id', products.remove);

app.post('/sales', sales.create);

app.get('/sales', sales.getAll);

app.get('/sales/:id', sales.findById);

app.put('/sales/:id', sales.update);

app.use(error);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
