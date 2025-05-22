import { useToast } from "vue-toastification";

export default defineNuxtPlugin(() => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const toast = useToast();

  const $customFetch = async (url, options = {}) => {
    const { onUploadProgress, signal, ...fetchOptions } = options;

    // Check if onUploadProgress is provided, indicating a file upload
    if (onUploadProgress && options.body instanceof FormData) {
      // Use XMLHttpRequest for file upload with progress
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(fetchOptions.method || "POST", `${baseUrl}${url}`, true);

        // Set headers, including Authorization if available
        const token = useCookie("token");
        if (token.value) {
          xhr.setRequestHeader("Authorization", `Token ${token.value}`);
        }

        if (fetchOptions.headers) {
          Object.entries(fetchOptions.headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        }

        // Track upload progress if onUploadProgress is provided
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentCompleted = Math.round((event.loaded * 100) / event.total);
            onUploadProgress(percentCompleted);
          }
        };

        // Handle response
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject({ status: xhr.status, statusText: xhr.statusText });
          }
        };

        xhr.onerror = () => reject({ status: xhr.status, statusText: xhr.statusText });

        // Handle manual abort with the signal
        if (signal) {
          signal.addEventListener("abort", () => {
            xhr.abort();
            reject({ status: 0, statusText: "Request aborted" });
          });
        }

        // Send request with FormData body
        xhr.send(fetchOptions.body);
      });
    } else {
      // Default to using $fetch for non-upload requests with the signal option
      try {
        const response = await $fetch(url, {
          baseURL: baseUrl,
          ...fetchOptions,
          signal,
          onRequest({ options }) {
            const token = useCookie("token");
            if (token.value) {
              options.headers = options.headers || {};
              options.headers = {
                ...options.headers,
                'Authorization': `Token ${token.value}`
              }
              // options.headers.Authorization = `Token ${token.value}`;
            }
          },
          async onResponseError({ response }) {
            if (import.meta.client && response?._data?.msg && response._data.msg !== 'NotAuthenticated' && response._data.msg !== 'Invalid page.') {
              toast(response._data.msg);
            }
            if (response.status === 401) {
              const token = useCookie("token");
              token.value = null;
              // navigateTo('/') if needed
            }
          },
        });
        
        return response;
      } catch (error) {
        if (error.name === 'AbortError') {
          console.warn(`Request to ${url} was aborted`);
        } else {
          throw error;
        }
      }
    }
  };

  return {
    provide: {
      customFetch: $customFetch,
    },
  };
});
