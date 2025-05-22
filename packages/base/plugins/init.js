import { useAuthBaseStore } from "~base/stores/auth";
import { useShopStore } from "~base/stores/shop";
import { useCartStore } from "~base/stores/shopCart";

export default defineNuxtPlugin(async () => {
    const shop = useShopStore();
    const shopCart = useCartStore();
    const token = useCookie("token");
    const { hostname } = useRequestURL();
    const checkedHostname = useSplitHostname(hostname);
    const auth = useAuthBaseStore();
    if (!checkedHostname) {
      return;
    }
    try {
      await shop.getShopData(checkedHostname);
      await shop.getCategories();
      if (token.value) {
        shopCart.init();
        await auth.getInfo();
      }
    } catch (error) {
      console.log(error);
    }
  });