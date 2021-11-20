const validateQuantity = (quantity) => {
    if (quantity <= 0) return false;
    if (!Number(quantity)) return false;

  return true;
};

const validateIdFormat = (id) => {
  if (typeof id !== 'string' || id.length !== 24) {
    return false;
  }
  return true;
};

module.exports = { validateQuantity, validateIdFormat };
