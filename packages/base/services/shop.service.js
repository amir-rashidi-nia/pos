import { useFetchApi } from "~base/composables/useFetchApi";
export default {
    getShopData(domain) {
      return useFetchApi(`shop/${domain?.subdomain}/details?is_domain=${domain?.isDomain}`)
    },
  };