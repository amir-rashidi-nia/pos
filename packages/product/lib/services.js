import { useFetchApi } from "~base/composables/useFetchApi";
export default {
  getProducts(shopName, category=0, tags=0, page){
    return useFetchApi(`shop/${shopName}/products/filterlight/?category=${category}&page=${page}&tags=${tags}`);
  },
  getProductsSearch(shopName, shopId, q, page){
    return useFetchApi(`shop/${shopName}/products/search/?q=${q}&page=${page}`,{
      method: "post",
      body: {
        shop: shopId,
      },
    })
  },
  getSingleProduct(shopName, productId){
    return useFetchApi(`shop/${shopName}/products/${productId}/`);
  },
  getMoreProduct(productId){
    return useFetchApi(`shop/random-products/${productId}/`);
  },
  getWishlistProduct(page){
    return useFetchApi(`user/wishlist/?page=${page}`);
  },
  getInitialProducGui(shop, shopId) {
    return useFetchApi(`shop/${shop}/product/create/empty/`,
      {
        method: 'post',
        body: {
          shop: shopId
        }
      }
    );
  },
  addProductImg(shopName, payload, signal, onUploadProgress) {
    return useFetchApi(`shop/${shopName}/products/picture/add/`, {
      body: payload,
      method: 'post',
      signal,
      onUploadProgress
    });
  },
  addProductVideo(shopName, payload, signal, onUploadProgress) {
    return useFetchApi(`shop/${shopName}/products/video/add/`, {
      body: payload,
      method: 'post',
      signal,
      onUploadProgress
    });
  },
  deleteProductImg(shopName, shopId, fileId) {
    return useFetchApi(`shop/${shopName}/products/picture/delete/`, {
      body: {
        shop: shopId,
        picture: fileId
      },
      method: 'post'
    });
  },
  deleteProductVideo(shopName, shopId, fileId) {
    return useFetchApi(`shop/${shopName}/products/video/delete/`, {
      body: {
        shop: shopId,
        video: fileId,
      },
      method: 'post'
    });
  },
  createProduct(shopName, shopId, productId, payload, medias) {
    return useFetchApi(`shop/${shopName}/product/create/`, {
      body: {
        shop: shopId,
        product: productId,
        medias,
        ...payload
      },
      method: 'post'
    });
  },
  editProduct(shopName, shopId, productId, payload) {
    return useFetchApi(`shop/${shopName}/product/update/`, {
      body: {
        shop: shopId,
        product: productId,
        ...payload
      },
      method: 'put'
    });
  },
  activeHandlerProduct(shopName, shopId, productId, state) {
    return useFetchApi(`shop/${shopName}/product/state/`, {
      body: {
        shop: shopId,
        product: productId,
        state
      },
      method: 'post'
    });
  },
  deleteProduct(shopName, shopId, productId) {
    return useFetchApi(`shop/${shopName}/product/delete/`, {
      body: {
        shop: shopId,
        product: productId,
      },
      method: 'delete'
    });
  },
  setAsCover(shopName, shopId, fileId) {
    return useFetchApi(`shop/${shopName}/products/picture/setcover/`, {
      body: {
        shop: shopId,
        picture: fileId
      },
      method: 'post'
    });
  },
  editStock(shopName, shopId, productId, stock) {
    return useFetchApi(`shop/${shopName}/product/stock/`, {
      body: {
        shop: shopId,
        product: productId,
        stock
      },
      method: 'post'
    });
  },
  editSale(shopName, shopId, productId, sale) {
    return useFetchApi(`shop/${shopName}/product/sale/`, {
      body: {
        shop: shopId,
        product: productId,
        sale
      },
      method: 'post'
    });
  },
  editPrice(shopName, shopId, productId, price) {
    return useFetchApi(`shop/${shopName}/product/price/`, {
      body: {
        shop: shopId,
        product: productId,
        price
      },
      method: 'post'
    });
  },
  addVariant(shopName, shopId, productId, payload) {
    return useFetchApi(`shop/${shopName}/variants/create/`, {
      body: {
        shop: shopId,
        product: productId,
        ...payload
      },
      method: 'post'
    });
  },
  deleteVariant(shopName, shopId, VariantId) {
    return useFetchApi(`shop/${shopName}/variants/delete/`, {
      body: {
        shop: shopId,
        variant: VariantId
      },
      method: 'post'
    });
  },
  ///////////
  getProductsAdmin(shopName, page){
    return useFetchApi(`shop/${shopName}/products/filter/?category=${0}&page=${page}&tags=${0}`, {
    });
  },
  addProductToWhishlist(productId) {
    return useFetchApi(`user/wishlist/update/`,{
      method: 'post',
      body: {
        pk: productId,
        state: 1
      }
      })
  },
  removeProductToWhishlist(productId) {
    return useFetchApi(`user/wishlist/update/`,{
      method: 'post',
      body: {
        pk: productId,
        state: 0
      }
    })
  },
};