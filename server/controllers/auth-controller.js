const catchAsync = require("./catch-async");
const User = require("../models/user-model");
const STATUS_CODE = require("../constants/status-code");
const GENERAL_CONSTANTS = require("../constants/general-constants");
const AppError = require("../utils/api-features");
const JWT = require("jsonwebtoken");
const { signupView } = require("../views/api/auth-view");

// Generate Token
const generateJasonWebToken = (id) => {
  let secretKey = process.env.SECRET_KEY;
  let expiresIn = process.env.TOKEN_EXPIRED_AT || "30D";
  return JWT.sign({ id }, secretKey, {
    expiresIn,
  });
};

exports.signUpUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(STATUS_CODE.CREATED).json({
    status: GENERAL_CONSTANTS.SUCCESS,
    record: { user: signupView(newUser) },
  });
});

exports.signInUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError("Email and password are required", STATUS_CODE.BAD_REQUEST)
    );
  }

  const user = await User.findOne({ email }).select("+password");
  const isPasswordCorrect = await user?.checkPassword(password, user.password);

  if (!user || !isPasswordCorrect) {
    return next(
      new AppError("Email or Password is incorrect", STATUS_CODE.UNAUTHORIZED)
    );
  }
  const token = generateJasonWebToken(user._id);

  res.status(STATUS_CODE.OK).json({
    user: { id: user.id, firstName: user.firstName, lastName: user.lastName },
    token,
  });
});
