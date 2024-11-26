const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const QUERY = {
  find: "find",
  findOne: "findOne",
  create: "create",
  findOneAndUpdate: "findOneAndUpdate",
  upsert: "upsert",
  findOneAndDelete: "findOneAndDelete",
  countDocuments: "countDocuments",
  updateOne: "updateOne",
  deleteMany: "deleteMany",
};

const HTTPStatus = {
  OK_STATUS: 200,
  CREATED: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

const {
  find,
  findOne,
  create,
  findOneAndUpdate,
  upsert,
  findOneAndDelete,
  countDocuments,
  updateOne,
  deleteMany,
} = QUERY;
const something_went_wrong = "Some thing went wrong, Please try again!";
const token_expired_login_again = "Token Expired, Please login again!";
const invalid_token =
  "Oops! The token you entered is invalid. Double-check and try a valid one.";
const admin_accessible_functions =
  "Functionality only access by admin, you have not access!";
const common_validating_message =
  "You should enter all essential information to ensure smooth processing.";

const commonQuery = async (
  model,
  query,
  data = {},
  update = {},
  select = "",
  populate = null,
  perPage = 0,
  page = 0
) => {
  try {
    const skip = perPage * (page - 1);
    let res;
    switch (query) {
      case find:
        res = await model
          .find(data)
          .sort(update)
          .limit(perPage)
          .skip(skip)
          .select(select)
          .populate(populate)
          .setOptions({ allowDiskUse: true });
        break;
      case findOne:
        res = await model
          .findOne(data)
          .select(select)
          .populate(populate)
          .lean();
        break;
      case create:
        res = await model.create(data);
        break;
      case findOneAndUpdate:
        res = await model
          .findOneAndUpdate(data, update, { new: true })
          .select(select)
          .populate(populate);
        break;
      case upsert:
        res = await model
          .findOneAndUpdate(data, update, {
            upsert: true,
            new: true,
          })
          .populate(populate);
        break;
      case findOneAndDelete:
        res = await model.findOneAndDelete(data);
        break;
      case countDocuments:
        res = await model.countDocuments(data);
        break;
      case updateOne:
        res = await model.updateOne(data, update, { new: true });
        break;
      case deleteMany:
        res = await model.deleteMany(data);
        break;
    }
    if (!data || !res || res.length == 0) {
      console.log("data res and length is may be null :: >>>> ", data);
      return {
        status: 2,
        message: something_went_wrong,
      };
    } else {
      return {
        status: 1,
        data: res,
      };
    }
  } catch (error) {
    console.log("error :>> ", error);
    return {
      status: 0,
      error: error.toString(),
    };
  }
};

const createBcryptPassword = async (password) => {
  try {
    let hash_password = await bcryptjs.hash(password, 12);
    return {
      status: 1,
      hash_password: hash_password,
    };
  } catch (error) {
    return {
      status: 0,
      error: something_went_wrong,
    };
  }
};

const checkBcryptPassword = async (password, savedPassword) => {
  try {
    let is_match = await bcryptjs.compare(password, savedPassword);
    if (!is_match) {
      return {
        status: 0,
        message: "Oops! It looks like the passwords you entered do not match.",
      };
    } else {
      return {
        status: 1,
        message: "Perfect match! Your passwords align.",
      };
    }
  } catch (error) {
    return {
      status: 0,
      error: something_went_wrong,
    };
  }
};

const generateToken = async (data, expire = null) => {
  try {
    let optionalData = {};
    if (expire) {
      optionalData = { expiresIn: expire };
    }
    const token = jsonwebtoken.sign(
      data,
      process.env.token_secret_key,
      optionalData
    );
    return {
      status: 1,
      token: token,
    };
  } catch (error) {
    return {
      status: 0,
      error: error,
    };
  }
};

const verifyToken = async (token) => {
  try {
    const verify = jsonwebtoken.verify(token, process.env.token_secret_key);
    return {
      status: 1,
      verify: verify,
    };
  } catch (error) {
    return {
      status: 0,
      error: error.message,
    };
  }
};

module.exports = {
  QUERY,
  HTTPStatus,
  something_went_wrong,
  token_expired_login_again,
  common_validating_message,
  admin_accessible_functions,
  invalid_token,
  commonQuery,
  createBcryptPassword,
  checkBcryptPassword,
  generateToken,
  verifyToken,
};
