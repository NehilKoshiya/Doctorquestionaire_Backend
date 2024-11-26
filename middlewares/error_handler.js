const {
  HTTPStatus: { NOT_FOUND, INTERNAL_SERVER },
} = require("../helpers/common_helper");

// 404 - not found error handler
// eslint-disable-next-line no-unused-vars
exports.notFoundRoute = (_req, res, _next) => {
  return res.status(NOT_FOUND).json({
    status: 0,
    message:
      "The requested route could not be located on the server. Double-check the URL and try again.",
  });
};

// 500 - internal server error handler
exports.errorHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next("Something went wrong. App server error.");
  }
  if (err.message) {
    return res.status(INTERNAL_SERVER).json({
      status: 0,
      message:
        "Internal Server Error. Our apologies, but something unexpected happened. Our team is on it.",
    });
  } else {
    return res.status(INTERNAL_SERVER).json({
      status: 0,
      message:
        "Internal Server Error. Our apologies, but something unexpected happened. Our team is on it.",
    });
  }
};
