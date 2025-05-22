import { useFetchApi } from "~base/composables/useFetchApi";

export default {
  getCategory(shopName) {
    return useFetchApi(`shop/${shopName}/categories/names/`);
  }
};
