const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const schemaRules = {
  firstName: {
    type: String,
    required: [true, "First name is required"],
    validate: {
      validator: function (value) {
        return /^[A-Za-z\s]+$/.test(value);
      },
      message: "First name contin only alphabets",
    },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    validate: {
      validator: function (value) {
        return /^[A-Za-z\s]+$/.test(value);
      },
      message: "First name contin only alphabets",
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: "Email is not valid",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password atleast 8 characters"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm Password is required"],
    minLength: [8, "Confirm Password atleast 8 characters"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Confirm pssword not match",
    },
  },
  passwordUpdatedAt: Date,
  resetPasswordToken: String,
  resetTokenExpiredIn: Date,
  isActive: {
    type: Boolean,
    default: true,
    select: false,
  },
};

const userSchema = new mongoose.Schema(schemaRules);

// Pre middlewares

userSchema.pre("save", async function (next) {
  console.log(this.password,'pre')
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  console.log(this.password,'post')
  this.confirmPassword = undefined;
  this.passwordUpdatedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function () {
  this.find({ isActive: { $ne: false } });
});

// Methods
userSchema.methods.checkPassword = function (candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.isPasswordUpdated = function (timeStamp) {
  if (this.passwordUpdatedAt) {
    let passwordUpdatedAt = this.passwordUpdatedAt / 1000;
    return timeStamp < passwordUpdatedAt;
  }

  return false;
};

const model = mongoose.model("User", userSchema);
model.createIndexes();

module.exports = model;
