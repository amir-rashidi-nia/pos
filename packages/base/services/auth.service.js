import { useFetchApi } from "~base/composables/useFetchApi";
export default {
  getUserInfo(shopId) {
    return useFetchApi(`user/info/`, {
      method: 'post',
      body: {
        shop: shopId
      }
    });
  },
};