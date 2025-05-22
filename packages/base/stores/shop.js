import { defineStore } from "pinia";
import shopApi from "~base/services/shop.service.js";
import categoryService from "~base/services/category.service.js";

export const useShopStore = defineStore("shop", () => {
  const shopData = ref({});
  const shopCategoris = ref([]);
  const shopLoading = ref(false);
  const shopError = ref(false);
  const categoryLoading = ref(false);
  const showCategoryModal = ref(false);
  
  async function getShopData(checkedHostname) {
    try {
      shopLoading.value = true;
      const data = await shopApi.getShopData(checkedHostname);
      if (data.status === "ok") {
        shopData.value = data?.data;
        useTitleFavicon(shopData.value.logo, shopData.value.eng_name);
      }
    } catch (error) {
      console.log('err' + error.status)
      shopError.value = true
      if (error.status == 404) {
        // navigateTo({ path: '/404' })
      }
    } finally {
      shopLoading.value = false;
    }
  }

  async function getCategories() {
    const { hostname } = useRequestURL();
    const checkedHostname = useSplitHostname(hostname);
    const categorySearchItem = shopData.value.eng_name || checkedHostname.subdomain;
    categoryLoading.value = true;
    try {
      const data = await categoryService.getCategory(categorySearchItem);
      if (data.status === "ok") {
        if (data?.data) {
          shopCategoris.value = data?.data;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      categoryLoading.value = false;
    }
  }

  return {
    getShopData,
    getCategories,
    shopCategoris,
    showCategoryModal,
    categoryLoading,
    shopData,
    shopLoading,
    shopError
  };
});
