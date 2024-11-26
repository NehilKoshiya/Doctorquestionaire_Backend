const {
  common_validating_message,
  HTTPStatus: { OK_STATUS, BAD_REQUEST },
  QUERY: { create, find },
  commonQuery,
} = require("../helpers/common_helper");
const Question = require("../models/question_model");

exports.addQuestions = async (req, res, next) => {
  const { title, subtitle, options } = req.body;

  if (!title || !options) {
    return res.status(BAD_REQUEST).json({
      status: 0,
      message: common_validating_message,
    });
  }

  const createQuestion = await commonQuery(Question, create, {
    title: title,
    subtitle: subtitle,
    options: options,
  });

  if (createQuestion.status == 1) {
    res.status(OK_STATUS).json({
      status: 1,
      message: "The question has been added successfully.",
      data: createQuestion.data,
    });
  } else {
    return res.status(BAD_REQUEST).json({
      status: 0,
      message: "Oops! Something went wrong while adding question.",
    });
  }
};

exports.getQuestionList = async (req, res, next) => {
  try {
    const allQuestions = await commonQuery(Question, find, {}, {}, "", []);
    if (allQuestions.status == 1 || allQuestions.status == 2) {
      return res.status(OK_STATUS).json({
        status: 1,
        message: "The questions has been fetched successfully.",
        data: allQuestions.status == 1 ? allQuestions.data : [],
      });
    } else {
      return res.status(BAD_REQUEST).json({
        status: 0,
        message: "Oops! Something went wrong while fetching questions lists.",
      });
    }
  } catch (error) {
    return res
      .status(BAD_REQUEST)
      .json({ status: 0, message: error.toString() });
  }
};
