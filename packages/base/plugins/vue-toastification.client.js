import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  ltr: true,
  position: "bottom-center",
  shareAppContext: true,
  transition: "Vue-Toastification__fade",
  icon: false,
  closeButton: false,
  newestOnTop: false,
  maxToasts: 1,
  hideProgressBar: true,
  toastClassName: "my-custom-toast-class",
  timeout: 2500,
};

export default defineNuxtPlugin({
  enforce: 'post',
  setup(nuxtApp) {
    nuxtApp.vueApp.use(Toast, options);
  }
});
