import { useFetchApi } from "~base/composables/useFetchApi";

export default {
  createCategory(shopName, payload, onUploadProgress) {
    return useFetchApi(`shop/${shopName}/category/create/`, {
      method: 'post',
      body: payload,
      onUploadProgress
    });
  },
  editCategory(shopName, payload, onUploadProgress) {
    return useFetchApi(`shop/${shopName}/category/update/`, {
      method: 'put',
      body: payload,
      onUploadProgress
    });
  },
  changeActivityCategory(shopName, shopId, categoryId, state) {
    console.log(state)
    return useFetchApi(`shop/${shopName}/category/state/`, {
      method: 'post',
      body: {
        shop: shopId,
        category: categoryId,
        state: state ? '0' : '1',
      },
    });
  },
  getCategoryNested(shopName) {
    return useFetchApi(`shop/${shopName}/categories/`);
  },
  getCategory(shopName) {
    return useFetchApi(`shop/${shopName}/categories/names/`);
  },
  getSingleCategory(categoryId) {
    return useFetchApi(`shop/category/get/?category_id=${categoryId}`);
  },
  getTag(shopName, categoryId) {
    return useFetchApi(`shop/${shopName}/category/${categoryId}/tags/`);
  },
  getCategoryProducts(shopName, category=0, tags=0, page){
    return useFetchApi(`shop/${shopName}/products/filterlight/?category=${category}&page=${page}&tags=${tags}`);
  },
};
