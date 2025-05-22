import { string } from "yup";
import { messages } from "./message";

const registerShopValidator = {
  name: string(messages.format).trim().required(messages.required),
  eng_name: string(messages.format).trim().required(messages.required),
  phone_number: string(messages.format).matches(/^[0-9]{11}$/, messages.format).required(messages.required),
  address: string(messages.format).trim().required(messages.required),
};

export { registerShopValidator };
