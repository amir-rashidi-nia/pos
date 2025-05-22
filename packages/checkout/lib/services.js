import { useFetchApi } from "~base/composables/useFetchApi";
export default {
  purchase(items, amount, deliveryFee, phone, addressId, address, lat, lng, userPickup) {
    return useFetchApi(`shop/buy/pos/`, {
      method: "post",
      body: {
        // phone: phone.slice(1),
        // address,
        // addressID: addressId,
        // lat,
        // lng,
        // delivery_fee: deliveryFee,
        amount,
        cart: {
          items,
        },
        // user_pickup: userPickup
      },
    });
  },
  getUserAddress() {
    return useFetchApi(`user/address/busilight/`);
  },
  getOrderdetails(code) {
    return useFetchApi(`shop/orders/detail/`, {
      method: 'post',
      body: {
        tracking_code: code,
      }
    });
  }
};
