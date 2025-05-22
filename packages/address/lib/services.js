import { useFetchApi } from "~base/composables/useFetchApi";
export default {
  addUserAddress(address, lat, lng) {
    return useFetchApi(`user/address/busilight/add/`, {
      method: "post",
      body: {
        address,
        lat,
        lng
      },
    });
  },
  getSellerOrders(shop, shopId, code, date, search, page) {
    return useFetchApi(`shop/${shop}/orders/${search}/?page=${page}`, {
      method: "post",
      body: {
        shop: shopId,
        tracking_code: code,
        date,
      },
    });
  },
  getUserAddress() {
    return useFetchApi(`user/address/busilight/`);
  },
};
