const validate = (name, quantity) => {
  if (name.length < 5) {
    return { code: 'invalid_data', message: '"name" length must be at least 5 characters long' };
  }
  
  if (quantity <= 0) {
    return { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' };
  }
  
  if (!Number(quantity)) {
    return { code: 'invalid_data', message: '"quantity" must be a number' };
  }

  return {};
};

module.exports = { validate };