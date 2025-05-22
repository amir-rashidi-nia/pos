import { string } from "yup";
import { messages } from "./message";

const priceValidator = string()
  .required(messages.required)
  .trim()
  .matches(/^\d+$/, messages.format);

const stockValidator = string()
  .required(messages.required)
  .trim()
  .matches(/^[0-9]*$/, messages.format);

const VariantValidator = {
  stock: string().matches(/^[0-9]+$/, messages.format),
  name: string(messages.format).required(messages.required),
  price: string()
    .required(messages.required)
    .matches(/^[0-9]+$/, messages.format),
};

const EditProductValidator = {
  name: string(messages.format)
      .required(messages.required).trim(),
  stock: string().matches(/^(\s*|\d+)$/, messages.format),
  price: string()
      .required(messages.required)
      .matches(/^[0-9]+$/, messages.format),
  description: string(messages.format).trim().notRequired(),
  category: string(messages.format).trim().notRequired(),
  discount: string(messages.format).trim().matches(/^(\d{1,2})?$/, messages.format).notRequired()
};

export {
  priceValidator,
  stockValidator,
  VariantValidator,
  EditProductValidator,
};
