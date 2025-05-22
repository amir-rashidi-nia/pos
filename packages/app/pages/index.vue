<template>
    <div class="w-full xl:max-w-5xl mx-auto">
        <template v-if="Object.keys(shopData).length > 0">
          <ProductLayout/>
        </template>
        <div v-else-if="shopLoading" class="py-10 px-8 text-xl lg:text-3xl text-center">
          <UiSpinner class="w-20 h-20"/>
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: 'main'
})
import { storeToRefs } from 'pinia';
import { useShopStore } from '~base/stores/shop';
import { useAuthBaseStore } from '~base/stores/auth';
const shop = useShopStore()
const { shopData, shopError, shopLoading } = storeToRefs(shop);

useSchemaOrg([
  defineLocalBusiness({
  }),
  defineWebPage({
    name: shopData.value?.eng_name
  })
])

const authBase = useAuthBaseStore()
const { forPurchase, showEnterModal } = storeToRefs(authBase)
const route = useRoute()

onMounted(async () => {
    if (route.query.forLogin == 1) {
        forPurchase.value = false
        showEnterModal.value = true
    }
})
</script>
