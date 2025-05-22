import { string } from "yup";
import { messages } from "./message";

const createCategoryValidator = {
  name: string(messages.format)
      .required(messages.required)
      .trim(),
  description: string(messages.format)
      .required(messages.required)
      .trim().notRequired(messages.format),
  parent: string(messages.format)
      .required(messages.required)
      .trim().notRequired(),
};

const editCategoryValidator = {
  name: string(messages.format)
      .required(messages.required)
      .trim(),
  description: string(messages.format)
      .required(messages.required)
      .trim().notRequired(),
};

export { createCategoryValidator, editCategoryValidator };
