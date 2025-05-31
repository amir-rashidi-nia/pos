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

const splitNumber = (num) => {
    return new Intl.NumberFormat('fa-IR').format(num);
};

const receiptCanvas = ref(null)

const drawReceipt = (receiptShopData, receiptItems, receiptTotal) => {
    if (!receiptCanvas.value) return;
    const ctx = receiptCanvas.value.getContext('2d');
    ctx.clearRect(0, 0, receiptCanvas.value.width, receiptCanvas.value.height);
    
    // Set styles
    ctx.font = '18px iranYekan';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'right';
    
    // Receipt width (384px for 80mm at ~96dpi)
    const receiptWidth = 384;
    const margin = 10;
    let yPos = 30;
    
    // Helper function to draw text
    const drawText = (text, options = {}) => {
        ctx.save();
        
        // Set font style
        const fontSize = options.fontSize || 18;
        const fontWeight = options.bold ? '900' : '700';
        ctx.font = `${fontWeight} ${fontSize}px iranYekan`;
        
        // Set text alignment
        ctx.textAlign = options.align || 'right';
        
        // Calculate x position
        let xPos = receiptWidth - margin;
        if (options.align === 'center') {
            xPos = receiptWidth / 2;
        } else if (options.align === 'left') {
            xPos = margin;
        }
        
        // Draw text
        ctx.fillText(text, xPos, yPos);
        
        // Move to next line
        yPos += fontSize + (options.spacing || 5);
        
        ctx.restore();
    };
    
    // Draw header
    drawText(receiptShopData?.name || 'سوپر مارکت', { fontSize: 20, bold: true, align: 'center' });
    drawText('ــــــــــــــــــــــــــــــــــــــــ', { align: 'center' });
    drawText('رسید خرید', { fontSize: 20, bold: true, align: 'center' });
    
    // Current date/time in Persian
    const now = new Date();
    const persianDate = now.toLocaleDateString('fa-IR');
    const persianTime = now.toLocaleTimeString('fa-IR');
    
    drawText(`تاریخ: ${persianDate}`, { bold: true });
    drawText(`ساعت: ${persianTime}`, { bold: true });
    drawText('ــــــــــــــــــــــــــــــــــــــــ', { align: 'center' });
    drawText('شرح کالا', { bold: true });
    
    // Draw items
    receiptItems?.forEach((item, index) => {
        const itemText = `${index + 1}. ${item.name}`;
        const qtyText = `${item.quantity} عدد`;
        const priceText = `${splitNumber(item.price)} ریال`;
        const totalText = `${splitNumber(item.price * item.quantity)} ریال`;
        
        // Item name
        drawText(itemText);
        
        // Details (aligned using fixed positions)
        ctx.save();
        ctx.font = '700 18px iranYekan';
        // Quantity at 150px from right
        ctx.fillText(qtyText, receiptWidth - 150, yPos);
        
        // Price at 80px from right
        ctx.fillText(priceText, receiptWidth - 80, yPos);
        
        // Total at margin from right
        ctx.fillText(totalText, receiptWidth - margin, yPos);
        
        ctx.restore();
        yPos += 20;
    });
    
    drawText('ــــــــــــــــــــــــــــــــــــــــ', { align: 'center', spacing: 10 });
    
    // Draw totals
    drawText(`جمع کل: ${splitNumber(receiptTotal)} ریال`, { font: '18px iranYekan', bold: true ,fontSize: 20, align: 'center'});
    drawText('ــــــــــــــــــــــــــــــــــــــــ', { align: 'center' });
    drawText('از خرید شما سپاسگزاریم', { align: 'center', fontSize: 20 });
    drawText(receiptShopData?.address || '', { align: 'center', fontSize: 18 });
};


const canvasToBase64 = () => {
  return receiptCanvas.value.toDataURL('image/png').replace(/^data:image\/png;base64,/, '')
}

async function purchase() {
    const finalProduct = products.value?.map((item) => {
        return {
            id: item.pk,
            price: item.price,
            name: item.name,
            quantity: item.quantity,
            variant: item.variantId,
        };
    });
    drawReceipt(shopData.value, finalProduct, amountCart.value)
    const base64 = canvasToBase64()
    printReceipt(base64)
    return
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
            drawReceipt(shopData.value, finalProduct, amountCart.value)
            const base64 = canvasToBase64()
            printReceipt(base64)
        }
    } catch (error) {
        console.log(error);
    } finally {
        purchaseLoading.value = false;
    }
}
</script>