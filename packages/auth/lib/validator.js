import { string } from "yup";
import { messages } from "./message";

const phoneNumberValidator = string()
  .required(messages.required)
  .trim()
  .matches(/((0?9))\d{9}/g, messages.format);

const nameValidator = string(messages.format)
  .required(messages.required)
  .trim();

const otpValidator = string(messages.format)
  .required(messages.required)
  .trim();

export { phoneNumberValidator, nameValidator, otpValidator };
