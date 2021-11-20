const express = require('express');
const { json } = require('body-parser');
const { create, getAll, findById, update, remove } = require('./controllers/products');
const sales = require('./controllers/sales');
const error = require('./middlewares/error');

const PORT = 3000;

const app = express();

app.use(json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', create);

app.get('/products', getAll);

app.get('/products/:id', findById);

app.put('/products/:id', update);

app.delete('/products/:id', remove);

app.post('/sales', sales.create);

app.use(error);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
