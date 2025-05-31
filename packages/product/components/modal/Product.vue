<template>
    <UiDialog variant="mobile" :model-value="model" @closed="closeModalHandler">
        <div
            v-if="!['pending'].includes(status)"
            class="relative pt-6 bg-primary dark:bg-dark-primary flex flex-col items-center  justify-between w-full max-w-3xl mx-auto no-scrollbar">

            <div class="w-full flex flex-col pb-8 sm:pb-0 gap-4">
                <!-- name and price -->
                <div
                    class="order-1 sm:order-none flex flex-col sm:flex-row xl:flex-col gap-2 xl:gap-4 justify-between w-full px-4 pt-4 sm:py-4 text-[1.06rem]">
                    <div class="flex items-center sm:items-start md:items-center justify-between">
                        <h1
                            class="w-full font-medium break-normal md:text-xl xl:text-2xl line-clamp-2 max-w-[170px] md:max-w-[250px] xl:max-w-none flex">
                            {{ productInfo?.data?.name }}
                        </h1>
                    </div>

                    <div class="md:text-xl xl:text-2xl self-start">
                        <div v-if="productInfo?.data?.discount_percent" class="flex gap-2 items-center">
                            <p dir="rtl" class="leading-none font-bold">
                                {{ calcDiscount(
                                    mainVariant?.price ?
                                        mainVariant.price :
                                        productInfo?.data?.price,
                                    productInfo.data.discount_percent
                                ) }}
                            </p>
                            <p class="line-through xl:text-lg opacity-60">
                                {{ splitNumber(
                                    mainVariant?.price ?
                                        mainVariant.price :
                                        productInfo?.data?.price
                                ) }}
                            </p>
                            <p dir="ltr" class="text-danger text-sm xl:text-lg">
                                ({{ productInfo.data.discount_percent }}% off)
                            </p>
                        </div>
                        <p dir="rtl" v-else class="font-semibold">
                            {{ splitNumber(
                                mainVariant?.price ?
                                    mainVariant.price :
                                    productInfo?.data?.price
                            ) }}
                        </p>
                    </div>
                </div>

                <ProductVariantList 
                    v-if="productInfo?.data.variants?.length > 0" 
                    class="order-2 sm:order-none"
                    :variants="productInfo?.data.variants" 
                    :active-variant-id="mainVariant?.pk"
                    @change-variant="changeVariantHandler" />

                <div
                    class="sm:sticky xl:flex-1 xl:justify-end order-3 sm:order-none z-50 bottom-0 flex flex-col justify-center gap-2 w-full sm:mt-3 sm:pt-2 sm:pb-4 px-4">
                    <UiButton @click.prevent="addToShopCart(productInfo.data)"
                        class="w-full" size="lg" variant="secondary">
                        {{ isExistInShopcart ? "حذف از سبد خرید" : "افزودن به سبد خرید" }}
                    </UiButton>
                </div>
            </div>
        </div>
        <UiSpinner v-else />
    </UiDialog>
</template>
<script setup>
import services from '~product/lib/services';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import { useShopStore } from '~base/stores/shop';
import { useCartStore } from '~base/stores/shopCart';
import { useAuthBaseStore } from '~base/stores/auth';

const authBase = useAuthBaseStore()
const shop = useShopStore()
const shopCart = useCartStore()

const { isLogin, forPurchase, showEnterModal } = storeToRefs(authBase)
const { shopData } = storeToRefs(shop)

const model = defineModel()

const props = defineProps(['productData'])

const toast = useToast()
const route = useRoute()

const mainVariant = ref(null);
const isExistInShopcart = ref(false);

const { data: productInfo, status } = await useAsyncData(
    `product${route.params.id}`,
    () => services.getSingleProduct(shopData.value.eng_name, props.productData?.gui),
    {
        watch: () => props.productData
    }
);

watchEffect(() => {
    if (productInfo.value?.data && shopData.value) {
        const variantId = productInfo.value.data.variants?.length == 0 ? 0 : mainVariant.value?.pk
        existInShopCart(productInfo.value.data.pk, variantId);
    }
});

function changeVariantHandler(variant) {
    if (variant.pk !== mainVariant.value?.pk) {
        mainVariant.value = variant;
        existInShopCart(productInfo.value.data.pk, variant.pk);
    } else {
        mainVariant.value = null;
        isExistInShopcart.value = false;
    }
}

function existInShopCart(productId, variantId = 0) {
    const selectedProduct = shopCart.checkExistInShopcart(
        productId,
        variantId,
    );
    isExistInShopcart.value = !!selectedProduct;
}


function productSchemaCreator(product) {
    const mainProduct = {
        name: product?.name,
        pk: product?.pk,
        price: mainVariant.value ? mainVariant.value.price : product?.price,
        cover: product.pictures[0]?.picture,
        variant: mainVariant.value ? mainVariant.value.name : null,
        variantId: mainVariant.value ? mainVariant.value.pk : 0,
        stock: mainVariant.value ? mainVariant.value?.stock : product.stock,
    };
    if (product?.discount_percent) {
        mainProduct.price = mainProduct.price - (mainProduct.price * product.discount_percent) / 100;
    }
    return mainProduct;
}

function addToShopCart(product) {
    const mainProduct = productSchemaCreator(product);
    const isValidate = validation(mainProduct, false, true);
    if (isValidate) {
        mainVariant.value = null;
        shopCart.addToCart(mainProduct);
        isExistInShopcart.value = true;
    }
}

function validation(product, ifValidateShap = false, ifCheckExistInShopCart = false) {
    if (ifValidateShap && !shopData.value?.business?.is_verified) {
        toast("فروشگاه احراز صلاحیت نشده است");
        return;
    }
    if (ifValidateShap && !shopData.value.is_active) {
        toast("فروشگاه در حال حاضر غیرفعال است");
        return;
    }
    if (productInfo.value.data.variants?.length > 0 && !mainVariant.value) {
        toast("حداقل یک ویژگی را انتخاب کنید");
        return;
    }
    if (ifCheckExistInShopCart && isExistInShopcart.value) {
        shopCart.deleteFromCart(product);
        isExistInShopcart.value = false;
        return;
    }
    if (product.stock == 0) {
        toast("کالا موجودی ندارد");
        return;
    }
    return true;
};

function closeModalHandler() {
    isExistInShopcart.value = false
    model.value = false;
}
</script>