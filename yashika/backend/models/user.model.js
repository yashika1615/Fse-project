import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hashedPassword = hashPassword(this.password);
  this.password = hashedPassword;
  return next();
});

UserSchema.methods.isPasswordCorrect = function (password) {
  const hashedPassword = hashPassword(password);
  return this.password === hashedPassword;
};

// Function to hash a password using crypto module
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return `${hash}.${salt}`;
}

const User = mongoose.model("User", UserSchema);

export { User };
