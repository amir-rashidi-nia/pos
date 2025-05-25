<template>
    <div class="relative w-full space-y-4">
        <CheckoutProductList />
        <div>
            <div v-if="!products || products?.length <= 0"
                class="flex w-full justify-center rounded-lg gap-2 py-2 px-2 mt-2 bg-primary-foreground dark:bg-dark-primary">
                <p class="text-sm leading-none">سبد خرید شما خالی است</p>
            </div>

            <div v-else
                class="flex w-full justify-between items-center rounded-lg gap-2 h-8 py-2 px-2 mt-2 bg-primary-foreground dark:bg-dark-primary">
                <p class="text-sm leading-none">مجموع</p>
                <div class="flex items-center gap-1">
                    <p class=" leading-none">{{ splitNumber(amountCart) }}</p>
                </div>
            </div>
        </div>

        <canvas ref="receiptCanvas" width="384" height="500" style="display: none;"></canvas>

        <UiButton @click="purchase" variant="secondary" class="w-full h-10" :loading="purchaseLoading">
            چاپ رسید
        </UiButton>
        <UiButton @click="shopCart.clear()" class="w-full h-10" :loading="purchaseLoading">
            حذف سبد خرید
        </UiButton>
        <AddressModalAdd v-model="showNewAddressForm" @updateAddress="updateAddressHandler" />
    </div>
</template>
<script setup>
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { useAuthBaseStore } from "~base/stores/auth";
import { useCartStore } from "~base/stores/shopCart";
import { useShopStore } from "~base/stores/shop";
import services from "~checkout/lib/services";
import { printReceipt } from '~checkout/utils/printReceipt';

const emit = defineEmits(['print']);
const authBase = useAuthBaseStore();
const shop = useShopStore();
const shopCart = useCartStore();
const { user, isLogin, cellphone: phoneNumber, forPurchase, showEnterModal } = storeToRefs(authBase);
const { shopData } = storeToRefs(shop);
const { amountCart, products } = storeToRefs(shopCart);
const toast = useToast();
const userPickup = ref(false)
const deliveryFee = ref(null);
const purchaseLoading = ref(false)
const showNewAddressForm = ref(false);
const formData = reactive({
    lat: null,
    lng: null,
    address: "",
});


async function updateAddressHandler() {
    deliveryFee.value = shopData.value?.delivery_fee
}

const receiptData = {
  shopName: 'سوپر گل',
  items: [
    { name: 'چای ایرانی', qty: 2, price: 25000 },
    { name: 'بیسکویت', qty: 1, price: 10000 },
  ],
  total: 60000,
  footer: 'از خرید شما سپاسگزاریم!'
}

const receiptCanvas = ref(null)

const drawReceipt = () => {
  const canvas = receiptCanvas.value
  const ctx = canvas.getContext('2d')

  // Clear and setup
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#000'
  ctx.font = '20px Tahoma'
  ctx.textAlign = 'right'
  ctx.direction = 'rtl'

  let y = 30

  ctx.fillText(receiptData.shopName, 370, y)
  y += 30
  ctx.fillText('-------------------------------', 370, y)
  y += 30

  for (const item of receiptData.items) {
    const line = `${item.name} x${item.qty} - ${item.price * item.qty} ریال`
    ctx.fillText(line, 370, y)
    y += 30
  }

  ctx.fillText('-------------------------------', 370, y)
  y += 30
  ctx.fillText(`جمع کل: ${receiptData.total} ریال`, 370, y)
  y += 30
  ctx.fillText(receiptData.footer, 370, y)
}


const canvasToBase64 = () => {
  return receiptCanvas.value.toDataURL('image/png').replace(/^data:image\/png;base64,/, '')
}

async function purchase() {
    drawReceipt()
    const base64 = canvasToBase64()
    printReceipt(base64)
    return
    const finalProduct = products.value?.map((item) => {
        return {
            id: item.pk,
            price: item.price,
            name: item.name,
            quantity: item.quantity,
            variant: item.variantId,
        };
    });
    purchaseLoading.value = true;
    try {
        const response = await services.purchase(
            finalProduct,
            amountCart.value,
            // phoneNumber.value ? phoneNumber.value : user.value?.user?.phone_number,
            // userPickup.value ? 0 : deliveryFee.value,
            // formData.address,
            // formData.lat,
            // formData?.lng,
            // userPickup?.value
        );
        if (response.status === "ok") {
            shopCart.clear()
            emit('print')
        }
    } catch (error) {
        console.log(error);
    } finally {
        purchaseLoading.value = false;
    }
}
</script>