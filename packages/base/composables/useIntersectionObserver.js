import { onMounted, onUnmounted, watch } from "vue";

export function useIntersectionObserver(target, callback, options = {}) {
  let observer;
  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);
    if (target.value) observer.observe(target.value);
  });
  watch(target, (newTarget, oldTarget) => {
    if (oldTarget) observer.unobserve(oldTarget); 
    if (newTarget) observer.observe(newTarget);  
  });
  onUnmounted(() => {
    if (target.value) observer.unobserve(target.value);
  });
}
