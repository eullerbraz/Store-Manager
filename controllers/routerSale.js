const express = require('express');
const { create, findById, getAll, update, remove } = require('./sales');

const router = express.Router();

router.post('/', create);

router.get('/', getAll);

router.get('/:id', findById);

router.put('/:id', update);

router.delete('/:id', remove);

module.exports = router;
