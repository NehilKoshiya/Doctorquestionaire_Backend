const {
  common_validating_message,
  HTTPStatus: { OK_STATUS, CREATED, BAD_REQUEST },
  QUERY: { create },
  commonQuery,
} = require("../helpers/common_helper");
const Patinet = require("../models/patient_model");

exports.submitPatinetDetails = async (req, res, next) => {
  const { remark, name, uniqueId, patient_type, options } = req.body;
  const userId = req.user.verify.userId;

  if (!uniqueId || !options || !patient_type) {
    return res.status(BAD_REQUEST).json({
      status: 0,
      message: common_validating_message,
    });
  }

  const sum = options.reduce((acc, num) => acc + num, 0);
  const avg = sum / options.length;

  const createPatinet = await commonQuery(Patinet, create, {
    remark: remark,
    name: name,
    uniqueid: uniqueId,
    totalscore: avg,
    patient_type: patient_type,
    created_by: userId,
  });

  if (createPatinet.status == 1) {
    res.status(OK_STATUS).json({
      status: 1,
      message: "Patient data has been updated successfully.",
      data: createPatinet.data,
    });
  } else {
    return res.status(BAD_REQUEST).json({
      status: 0,
      message: "Oops! Something went wrong while adding patinet data.",
    });
  }
};

exports.getPatientList = async (req, res, next) => {
  try {
    const userId = req.user.verify.userId;

    const allPatient = await commonQuery(
      Patinet,
      find,
      {},
      { created_at: -1, created_by: userId },
      "",
      []
    );
    if (allPatient.status == 1 || allPatient.status == 2) {
      return res.status(OK_STATUS).json({
        status: 1,
        message: "The questions has been fetched successfully.",
        data: allPatient.status == 1 ? allPatient.data : [],
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
