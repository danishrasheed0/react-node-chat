const { ApiFeatures } = require("../utils/api-features");
const catchAsync = require("./catch-async");
const STATUS_CODE = require("../constants/status-code");
const GENERAL_CONSTANTS = require("../constants/general-constants");
const User = require("../models/user-model");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

  res.status(STATUS_CODE.OK).json({
    status: GENERAL_CONSTANTS.SUCCESS,
    total_records: users.length,
    record: users,
  });
});
