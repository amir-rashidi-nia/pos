import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
  const refreshProduct = ref(false)
  const uploadedMedia = ref([]);
  const products = ref([]);
  const productMediaEdit = ref([]);
  const productMediaCreate = ref([]);

  const route = useRoute()
  const infiniteScrollingPage = ref(1);
  const infiniteScrollingProducts = ref([]);
  const infiniteScrollingLoading = ref(false);
  const infiniteScrollingFinish = ref(false);
  const infiniteScrollingNoResult = ref(false);

  const isUploadFileComplete = ref(false);
  const controller = ref();

  watch(() => route.path ,() => {
    // infiniteScrollingPage.value = 1;
  })
  watchEffect(() => {
    isUploadFileComplete.value = productMediaCreate.value.every(
      (media) => !media.loading,
    );
  });

  function reset() {
    products.value = [];
    infiniteScrollingFinish.value = false;
    infiniteScrollingPage.value = 1;
  }


  return {
    products,
    uploadedMedia,
    infiniteScrollingPage,
    infiniteScrollingProducts,
    infiniteScrollingFinish,
    infiniteScrollingNoResult,
    infiniteScrollingLoading,
    isUploadFileComplete,
    reset,
    refreshProduct,
    controller,
    productMediaEdit,
    productMediaCreate,
  };
});
