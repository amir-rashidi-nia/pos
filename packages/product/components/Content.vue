<template>
    <div
        class="relative pt-12 sm:pr-14 xl:pr-32 flex flex-col items-center  justify-between w-full max-w-3xl mx-auto no-scrollbar">
        <div
            class="fixed top-0 z-100 w-full sm:w-[calc(100%-3.5rem)] bg-background dark:bg-dark-background flex justify-between items-center py-2 pb-2 pr-4 pl-2 max-w-3xl mx-auto">
            <div class="flex items-center gap-4">
                <a href="" @click.prevent="$router.back()">
                    <p class="sr-only">go back</p>
                    <SvgoBack class="flex-none rotate-180 text-xl" />
                </a>
                <div>
                    <div class="flex items-center gap-[.35rem]">
                        <p class="font-bold">{{ shopData.name }}</p>
                        <SvgoVerify v-show="shopData?.business?.is_verified" class="w-3.5 h-3.5 text-brand"/>
                    </div>
                    <NuxtLink to="/" class="text-[.725rem] text-brand cursor-pointer">مشاهده فروشگاه</NuxtLink>
                </div>
            </div>
            <div class="flex justify-content items-center gap-2">
                <div @click.prevent="shopCartClickHandler" class="flex-none relative pr-3">
                    <SvgoShopcart name="ShopCart" class="text-2xl cursor-pointer" />
                    <span v-if="!!count"
                        class="absolute text-white bg-brand bottom-0 right-2 flex items-center justify-center rounded-full px-[1px] pt-0.5 h-3 w-3 text-[0.4rem]">
                        {{ count }}
                    </span>
                </div>
            </div>
        </div>

        <div class="w-full">
            <ProductSwiper :data="productInfo?.data.pictures?.map(Object => Object.picture)" />
        </div>

        <div class="w-full flex flex-col pb-8 sm:pb-0 gap-4">
            <!-- name and price -->
            <div
                class="order-1 sm:order-none flex flex-col sm:flex-row xl:flex-col gap-2 xl:gap-4 justify-between w-full px-4 pt-4 sm:py-4 text-[1.06rem]">
                <div class="flex items-center sm:items-start md:items-center justify-between">
                    <h1
                        class="w-full font-medium break-normal md:text-xl xl:text-2xl line-clamp-2 max-w-[170px] md:max-w-[250px] xl:max-w-none flex">
                        {{ productInfo?.data?.name }}
                    </h1>
                    <div class=" flex items-center">
                        <SvgoSend filled class="text-2xl md:text-2xl sm:mr-4 mr-auto ml-3" @click.stop.self="copyProductHandler" />
                    </div>
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
                <UiButton 
                    v-if="shopData.business.accept_payment" 
                    @click.prevent="purchase(productInfo.data)"
                    class="w-full"
                    size="lg"
                    :variant="shopData.is_active ? 'default' : 'secondary'">
                    پرداخت
                </UiButton>
                <UiButton 
                    v-if="shopData.business.accept_payment" 
                    @click.prevent="addToShopCart(productInfo.data)"
                    class="w-full"
                    size="lg"
                    :variant="shopData.is_active ? 'default' : 'secondary'">
                    {{ isExistInShopcart ? "حذف از سبد خرید" : "افزودن به سبد خرید" }}
                </UiButton>
                <UiButton v-if="!shopData.business.accept_payment" variant="secondary">
                    درخواست اطلاعات بیشتر
                </UiButton>
            </div>
        </div>
    </div>
</template>
<script setup>
import services from '~product/lib/services';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import { useShopStore } from '~base/stores/shop'
import { useCartStore } from '~base/stores/shopCart';
import { useAuthBaseStore } from '~base/stores/auth';

const clientUrl = import.meta.env.VITE_CLIENT_URL;
const protocolUrl = import.meta.env.VITE_PROTOCOL_URL;

const authBase = useAuthBaseStore()
const shop = useShopStore()
const shopCart = useCartStore()

const { isLogin, forPurchase, user, showEnterModal } = storeToRefs(authBase)
const { shopData } = storeToRefs(shop)
const { count } = storeToRefs(shopCart)

const props = defineProps(['modelValue', 'data'])
const emit = defineEmits(['update:modelValue'])

const toast = useToast()
const route = useRoute()

const mainVariant = ref(null);
const isExistInShopcart = ref(false);

const { data: productInfo, error } = await useAsyncData(
    `product${route.params.id}`,
    () => services.getSingleProduct(shopData.value.eng_name, route.params.id),
);
watch(()=> error.value,
() => console.log(error.value))
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
        shopCart.addToCart(mainProduct);
        isExistInShopcart.value = true;
    }
}

function purchase(product) {
    const mainProduct = productSchemaCreator(product);
    const isValidate = validation(mainProduct, true);

    if (!isValidate) {
        return
    } else {
        shopCart.addToCart(mainProduct);
    }

    if (!isLogin.value) {
        forPurchase.value = true
        showEnterModal.value = true
    } else {
        return navigateTo('/checkout')
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

function shopCartClickHandler() {
    forPurchase.value = true
    return navigateTo('/checkout')
}

function copyProductHandler() {
    const link = `${protocolUrl}://${postInfo.value?.data?.shop?.eng_name}.${clientUrl}post/${postInfo.value?.data?.internal_id}`
    if (window.navigator.clipboard) {
        window.navigator.clipboard.writeText(link);
        toast(`لینک کپی شد`)
    } else {
        alert('از مرورگر به روز تری استفاده کنید')
    }
}
</script>