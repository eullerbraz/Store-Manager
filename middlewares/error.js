const dictionary = (code) => {
  switch (code) {
    case 'invalid_data':
      return 422;
    case 'internal_error':
      return 500;
    default:
      return 500;
  }
};

module.exports = (err, req, res, _next) => {
  const { message, code } = err;

  if (code) {
    return res.status(dictionary(code)).json({ err: { code, message } });
  }

  res.status(dictionary('internal_error')).json(message);
};
