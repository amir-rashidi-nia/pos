export function useFetchApi(url, options) {
  return useNuxtApp().$customFetch(url, options);
};