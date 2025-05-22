import { useFetchApi } from "~base/composables/useFetchApi";

export default {
  getAddressByCoords(lat, lng) {
    return useFetchApi(`shop/delivery/location/?lat=${lat}&lng=2C${lng}`);
  }
};