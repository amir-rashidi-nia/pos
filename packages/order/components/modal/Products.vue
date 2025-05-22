<template>
    <UiDialog variant="mobile" :model-value="modelValue" @closed="$emit('update:modelValue', false)">
        <div class="relative flex min-h-[40vh] flex-col items-center justify-between px-4 pb-4 sm:pt-4">
            <div class="w-full flex flex-col p-2 rounded-lg gap-2 overflow-y-scroll max-h-[210px] no-scrollbar bg-primary-foreground dark:bg-dark-primary">
                <OrderLoadingProduct v-if="!products.length" />
                <template v-else>
                    <OrderProductDetailItem v-for="product in products" :data="product" />
                </template>
            </div>
            <div dir="rtl" class="flex w-full justify-between rounded-lg gap-2 py-2 px-2 mt-6 bg-primary-foreground dark:bg-dark-primary">
                <p class="text-sm leading-none">مجموع</p>
                <p class=" leading-none">
                    {{ splitNumber(totalAmount) }}
                </p>
            </div>
        </div>
    </UiDialog>
</template>
<script setup>
import { watch, ref, computed } from 'vue';
import services from '~order/lib/services';

const props = defineProps(['modelValue', 'data'])
const emit = defineEmits(['update:modelValue'])

const products = ref([])

watch(() => props.modelValue,
    async () => {
        if (props.modelValue == true) {
            try {
                const respose = await services.getOrderProducts(props.data.tracking_code);
                if (respose?.status === "ok") {
                    products.value = respose.data
                }
            } catch (error) {
            }
        } else {
            products.value = []
        }
    }
)
const totalAmount = computed(() => {
    return products.value.reduce((total, p) => {
        return total + p.price * p.quantity;
    }, 0);
});
</script>
