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

const drawReceipt = (receiptShopData, receiptItems, receiptTotal, receiptCode) => {
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
    const cardPadding = 8;
    const cardMargin = 5;
    let yPos = 30;
    
    // Helper function to draw text
    const drawText = (text, options = {}) => {
        ctx.save();
        
        // Set font style
        const fontSize = options.fontSize || 18;
        const fontWeight = options.bold ? '800' : '700';
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
    ctx.font = '800 20px iranYekan';
    drawText(receiptShopData?.name || 'سوپر مارکت', { fontSize: 24, bold: true, align: 'center' });
    drawText('ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ', { align: 'center' });
    drawText('رسید خرید', { fontSize: 20, bold: true, align: 'center' });
    
    // Current date/time in Persian
    const now = new Date();
    const persianDate = now.toLocaleDateString('fa-IR');
    const persianTime = now.toLocaleTimeString('fa-IR');

    ctx.save();
    ctx.font = '700 18px iranYekan';
    const dateTimeText = `تاریخ: ${persianDate}   |   ساعت: ${persianTime}`;
    ctx.fillText(dateTimeText, receiptWidth - margin, yPos);
    ctx.restore();
    yPos += 25;

    drawText(`کد پذیرش: ${receiptCode}` || '');

    drawText('ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ', { align: 'center' });
    
    // Draw items in cards
    receiptItems?.forEach((item, index) => {
        // Calculate card height based on content
        const cardHeight = 80; // Fixed height for each product card
        
        // Draw card background
        ctx.save();
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.strokeRect(margin, yPos, receiptWidth - margin*2, cardHeight);
        ctx.restore();
        
        // Position content inside card
        const contentYStart = yPos + cardPadding;
        let contentY = contentYStart;
        
        // Item name (top of card)
        ctx.save();
        ctx.font = '700 18px iranYekan';
        ctx.fillText(`${index + 1}. ${item.name}`, receiptWidth - margin, contentY);
        contentY += 25;
        
        // Separator line inside card
        ctx.strokeStyle = '#eee';
        ctx.beginPath();
        ctx.moveTo(margin + 10, contentY);
        ctx.lineTo(receiptWidth - margin - 10, contentY);
        ctx.stroke();
        contentY += 15;
        
        // Item details (bottom of card)
        ctx.font = '700 18px iranYekan';
        
        // Quantity
        ctx.fillText(`تعداد: ${item.quantity} عدد`, receiptWidth - margin, contentY);
        
        // Price (centered)
        ctx.textAlign = 'center';
        ctx.fillText(`قیمت: ${splitNumber(item.price)} ریال`, receiptWidth / 2, contentY);
        
        // Total (left aligned)
        ctx.textAlign = 'left';
        ctx.fillText(`جمع: ${splitNumber(item.price * item.quantity)} ریال`, margin, contentY);
        
        ctx.restore();
        
        // Move yPos to bottom of card plus margin
        yPos += cardHeight + cardMargin;
    });
    
    // Draw totals section
    drawText('ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ', { align: 'center', spacing: 10 });
    
    // Total amount
    ctx.save();
    ctx.font = '800 20px iranYekan';
    ctx.textAlign = 'center';
    ctx.fillText(`جمع کل: ${splitNumber(receiptTotal)} ریال`, receiptWidth / 2, yPos);
    ctx.restore();
    yPos += 30;
    
    // Footer
    drawText('ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ', { align: 'center' });
    drawText('از خرید شما سپاسگزاریم', { align: 'center', fontSize: 20 });
    
    drawText(`${receiptShopData.name}.busibuy.ir`, { align: 'center' });
    // Shop contact info if available
    if (receiptShopData?.website) {
        drawText(`وبسایت: ${receiptShopData.website}`, { align: 'center' });
    }
    
};

console.log(shopData.value)

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

    purchaseLoading.value = true;
    try {
        const response = await services.purchase(
            finalProduct,
            amountCart.value,
        );
        if (response.status === "ok") {
            drawReceipt(shopData.value, finalProduct, amountCart.value, response?.data?.data?.tracking_code)
            const base64 = canvasToBase64()
            printReceipt(base64)
            shopCart.clear()
        }
    } catch (error) {
        console.log(error);
    } finally {
        purchaseLoading.value = false;
    }
}
</script>