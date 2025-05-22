import { useFetchApi } from "~base/composables/useFetchApi";
export default {
  sendNumberOTP(phone_number, shopId) {
    return useFetchApi(`user/sendotp/`, {
      method: 'post',
      body: {
        phone_number,
        shop: shopId
      }
    });
  },
  verifyOtpNumber(phone_number, shopId, otp) {
    return useFetchApi(`user/verifyotp/busilight/`, {
      method: 'post',
      body: {
        phone_number,
        shop_id: shopId,
        otp,
      }
    });
  },
  editNumberSendOTP(phone_number) {
    return useFetchApi(`user/update/number/sendotp/`, {
      method: 'post',
      body: {
        phone_number,
      }
    });
  },
  editNumberVerifyOTP(otp) {
    return useFetchApi(`user/update/number/verifyotp/`, {
      method: 'post',
      body: {
        otp,
      }
    });
  },
  sendUserName(name) {
    return useFetchApi(`user/update/customer/name/`, {
      method: 'post',
      body: {
        name,
      }
    });
  },
};