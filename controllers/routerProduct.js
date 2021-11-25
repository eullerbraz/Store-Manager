const express = require('express');
const rescue = require('express-rescue');
const { create, findById, getAll, update, remove } = require('./products');

const router = express.Router();

router.post('/', rescue(create));

router.get('/', rescue(getAll));

router.get('/:id', rescue(findById));

router.put('/:id', rescue(update));

router.delete('/:id', rescue(remove));

module.exports = router;
