import { useFetchApi } from "~base/composables/useFetchApi";
export default {
  updateProductsPrice(products) {
    return useFetchApi(`shop/getprice/`, {
      method: "post",
      body: {
        items: [...products],
      },
    });
  },
};