import { useFetchApi } from "~base/composables/useFetchApi";
export default {
  getAllShops(page) {
    return useFetchApi(`shop/getall/?page=${page}`);
  },
  registerShop(payload){
    return useFetchApi(`user/shop/create/`, {
      body: {
        ...payload,
      },
      method: 'post'
    });
  },
};
