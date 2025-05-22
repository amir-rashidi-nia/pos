import { useFetchApi } from "~base/composables/useFetchApi";
export default {
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
  getCustomerOrders(page = 1) {
    return useFetchApi(`shop/orders/all/?page=${page}`);
  },
  getOrderProducts(code) {
    return useFetchApi(`shop/orders/products/`, {
      method: "post",
      body: {
        tracking_code: code,
      },
    });
  },
  changeOrderStatus(shop, shopId, code, status) {
    return useFetchApi(`shop/${shop}/orders/status/update/`, {
      method: "put",
      body: {
        shop: shopId,
        tracking_code: code,
        status,
      },
    });
  },
  getreturnedOrderDetails(shop, shopId, code) {
    return useFetchApi(`shop/${shop}/orders/returned/detail/`, {
      method: "post",
      body: {
        shop: shopId,
        tracking_code: code,
      },
    });
  }
};
