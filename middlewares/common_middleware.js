const {
  HTTPStatus: { UNAUTHORIZED, FORBIDDEN },
  token_expired_login_again,
  invalid_token,
  verifyToken,
} = require("../helpers/common_helper");

authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[2];
    console.log("token :>> ", token);
    if (!token)
      return res
        .status(FORBIDDEN)
        .json({ status: 0, message: token_expired_login_again });
    const decoded = await verifyToken(token);
    if (decoded.status == 1) {
      req.user = decoded;
      next();
    } else {
      return res.status(UNAUTHORIZED).json(decoded);
    }
  } catch (error) {
    return res.status(FORBIDDEN).json({ status: 0, message: invalid_token });
  }
};

module.exports = {
  authentication,
};
