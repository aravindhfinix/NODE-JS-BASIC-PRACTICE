import joi from "joi";
import mongoose from "mongoose";

export const userSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .trim()
    .required(),
  password: joi.string().min(5).max(12).trim().required(),
  role: joi.string(),
  confirmPassword: joi
    .string()
    .valid(joi.ref("password"))
    .required()
    .trim()
    .label("Confirm password")
    .options({ messages: { "any.only": "{{#label}} does not match" } }),
});

export const updateSchema = joi.object({
  name: joi.string().trim(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .trim(),
  password: joi.string().min(5).max(12).trim(),
  role: joi.string(),
  confirmPassword: joi
    .string()
    .valid(joi.ref("password"))
    .trim()
    .label("Confirm password")
    .options({ messages: { "any.only": "{{#label}} does not match" } }),
});

export const User = mongoose.model("user", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number,
  },
  logged_in: {
    type: Boolean,
    default: true,
  },
  books: [
    {
      type: mongoose.Types.ObjectId,
      ref: "book",
    },
  ],
});
