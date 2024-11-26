const {
  generateToken,
  common_validating_message,
  HTTPStatus: { OK_STATUS, CREATED, BAD_REQUEST },
  QUERY: { findOne, create },
  commonQuery,
} = require("../helpers/common_helper");
const User = require("../models/user_model");

exports.userLogin = async (req, res, next) => {
  const { email, name, login_type } = req.body;

  console.log("email,login,login_type :>> ", email, name, login_type);

  if (!email || !login_type || !name) {
    return res.status(BAD_REQUEST).json({
      status: 0,
      message: common_validating_message,
    });
  }

  const findUser = await commonQuery(User, findOne, { email });

  if (findUser.status == 1) {
    const jwtToken = await generateToken({
      email: email,
      userId: findUser.data._id,
    });

    return res.status(OK_STATUS).json({
      status: 1,
      message:
        "The login process was successful, and the user is now authenticated.",
      token: jwtToken.token,
      data: findUser.data,
    });
  } else {
    const createUser = await commonQuery(User, create, {
      email,
      name,
      login_type,
    });

    if (createUser.status == 1) {
      const token = await generateToken({
        email: email,
        userId: createUser.data._id,
        fcmToken: createUser.data.fcm_token,
      });

      return res.status(CREATED).json({
        status: 1,
        message: "The user account has been successfully established.",
        token: token.token,
        data: createUser.data,
      });
    } else {
      return res.status(BAD_REQUEST).json({
        status: 0,
        message: "Oops! Something went wrong while creating user.",
      });
    }
  }
};
