import { defineStore, storeToRefs } from "pinia";
import { useShopStore } from "~base/stores/shop.js";
import { useToast } from "vue-toastification";
import userService from "../services/user.service";

function updateLocalStorage(cart) {
  if (import.meta.client) {
    localStorage.setItem("shopcart", JSON.stringify(cart));
    return true;
  } else {
    return false;
  }
}

export const useCartStore = defineStore("shopCart", () => {
  const carts = ref({});

  const shop = useShopStore();
  const { shopData } = storeToRefs(shop);

  const toast = useToast();

  const products = computed(() => carts.value[shopData.value.pk]);

  const count = computed(() => {
    const shopCart = carts.value[shopData.value.pk];
    return shopCart ? shopCart.length : 0;
  });

  const amountCart = computed(() => {
    const shopCart = carts.value[shopData.value.pk];
    return shopCart
      ? shopCart.reduce((total, p) => total + p.price * p.quantity, 0)
      : 0;
  });

  function init() {
    if (import.meta.client) {
      carts.value = localStorage.getItem("shopcart")
        ? JSON.parse(localStorage.getItem("shopcart"))
        : {};
    }
  }

  async function updateProducts() {
    const currentProducts = products.value;
    if (!currentProducts || currentProducts.length === 0) {
      return;
    }
    const finalProduct = currentProducts.map((item) => ({
      product: item.pk,
      variant: item.variantId,
    }));
    try {
      const res = await userService.updateProductsPrice(finalProduct);
      if (res.status === "ok") {
        const shopCart = carts.value[shopData.value.pk];
        res.data.forEach((d) => {
          const product = shopCart.find(
            (p) => {
              return p.pk == d.product && p.variantId == d.variant
            }
          );
          if (product) {
            product.stock = d.stock;
            product.price = d.price;
            product.isAvailable = true;
          }
        });
        carts.value[shopData.value.pk] = shopCart.filter((p) => p.stock !== 0 && p.isAvailable );
        updateLocalStorage(carts.value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function checkExistInShopcart(Id, variantId = 0) {
    const shopCart = carts.value[shopData.value.pk];
    return shopCart
      ? shopCart.find((p) => p.pk === Id && p.variantId === variantId) || false
      : false;
  }

  function addToCart(product) {
    const shopPk = shopData.value.pk;
    if (!carts.value[shopPk]) {
      carts.value[shopPk] = [];
    }
    const shopCart = carts.value[shopPk];
    const item = shopCart.find(
      (p) => p.pk === product.pk && p.variantId === product.variantId,
    );
    if (item) {
      item.quantity++;
    } else {
      shopCart.push({ ...product, quantity: 1 });
    }
    updateLocalStorage(carts.value);
  }

  function increment(product) {
    const item = findCartItem(product);
    if (item) {
      if (product.stock > -1 && item.quantity >= product.stock) {
        toast("کالا موجودی ندارد");
        return;
      }
      item.quantity++;
      updateLocalStorage(carts.value);
    }
  }

  function decrement(product) {
    const item = findCartItem(product);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        const shopCart = carts.value[shopData.value.pk];
        const index = shopCart.findIndex(
          (p) => p.pk === item.pk && p.variantId === item.variantId,
        );
        shopCart.splice(index, 1);
      }
      updateLocalStorage(carts.value);
    }
  }

  function deleteFromCart(product) {
    const item = findCartItem(product);
    if (item) {
      const shopCart = carts.value[shopData.value.pk];
      const index = shopCart.findIndex(
        (p) => p.pk === item.pk && p.variantId === item.variantId,
      );
      shopCart.splice(index, 1);
    }
    updateLocalStorage(carts.value);
  }

  function findCartItem(product) {
    return carts.value[shopData.value.pk]?.find(
      (p) => p.pk === product.pk && p.variantId === product.variantId,
    );
  }

  function clear() {
    carts.value[shopData.value.pk] = [];
    updateLocalStorage(carts.value);
  }
  return {
    carts,
    count,
    amountCart,
    products,
    deleteFromCart,
    addToCart,
    decrement,
    updateProducts,
    checkExistInShopcart,
    increment,
    init,
    clear,
  };
});