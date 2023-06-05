const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message ||'Une erreur est survenue.Réessayer plus tard.',
  };
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
    .map((item) => item.message)
    .join(',');
  customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Les valeurs saisies existent déjà pour le champ ${Object.keys(
      err.keyValue
    )}, merci de modifer votre valeur.`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.msg = `Aucun id n'a été trouvé: ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;