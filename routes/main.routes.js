const express = require("express");

const { userLogin } = require("../controllers/user_controller");
const {
  getPatientList,
  submitPatinetDetails,
} = require("../controllers/patient_controller");
const {
  addQuestions,
  getQuestionList,
} = require("../controllers/question_controller");
const { authentication } = require("../middlewares/common_middleware");
const router = express.Router();

// USER - authentication api main route
router.post("/login", userLogin);

// QUESTION - add question api main route
router.post("/addque", addQuestions);

// QUESTION - get question api main route
router.get("/getque", authentication, getQuestionList);

// PATIENT - submit question details api main route
router.get("/submit", authentication, submitPatinetDetails);

// PATIENT - get patient list api main route
router.get("/getpatientlist", authentication, getPatientList);

module.exports = router;
