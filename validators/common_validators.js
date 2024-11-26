const { validationResult } = require("express-validator");
const {
  HTTPStatus: { BAD_REQUEST },
} = require("../helper/common_helper");

exports.checkValidate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(BAD_REQUEST).json({
      status: 0,
      message: errors.array(),
    });
  };
};
