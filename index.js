const express = require('express');
const { json } = require('body-parser');
const { create, findById } = require('./controllers/products');
const error = require('./middlewares/error');

const PORT = 3000;

const app = express();

app.use(json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', create);

app.get('/products/:id', findById);

app.use(error);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
