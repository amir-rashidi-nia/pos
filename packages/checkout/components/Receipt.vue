<template>
    <div class="bg-white rounded-lg shadow-lg px-8 py-10 w-full mx-auto z-[9999]">
        <div class="flex items-center justify-between mb-8">
            <div class="flex items-center">
                <img class="h-8 w-8 mr-2" src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
                    alt="Logo" />
                <div class="text-gray-700 font-semibold text-lg">{{ shopData.name }}</div>
            </div>
            <div class="text-gray-700">
                <div class="font-bold text-xl mb-2">INVOICE</div>
                <div class="text-sm">Date: 01/05/2023</div>
                <div class="text-sm">Invoice #: INV12345</div>
            </div>
        </div>
        <div class="border-b-2 border-gray-300 pb-8 mb-8">
            <h2 class="text-2xl font-bold mb-4">Bill To:</h2>
            <div class="text-gray-700 mb-2">John Doe</div>
            <div class="text-gray-700 mb-2">123 Main St.</div>
            <div class="text-gray-700 mb-2">Anytown, USA 12345</div>
            <div class="text-gray-700">johndoe@example.com</div>
        </div>
        <table class="w-full text-right mb-8">
            <thead>
                <tr>
                    <th class="text-gray-700 font-bold uppercase py-2">توضیحات</th>
                    <th class="text-gray-700 font-bold uppercase py-2">تعداد</th>
                    <th class="text-gray-700 font-bold uppercase py-2">قیمت</th>
                    <th class="text-gray-700 font-bold uppercase py-2">مجموع</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.pk">
                    <td class="py-4 text-gray-700 truncate max-w-10">{{ product.name }}</td>
                    <td class="py-4 text-gray-700">{{ product.quantity }}</td>
                    <td class="py-4 text-gray-700">{{ product.price }}</td>
                    <td class="py-4 text-gray-700">{{ product.price * product.quantity }}</td>
                </tr>
            </tbody>
        </table>
        <div class="flex justify-start mb-8">
            <div class="text-gray-700 mr-2">مجموع:</div>
            <div class="text-gray-700 font-bold text-xl">{{ splitNumber(amountCart) }}</div>
        </div>
        <div class="border-t-2 border-gray-300 pt-8 mb-8">
            <div class="text-gray-700 mb-2">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</div>
            <div class="text-gray-700">زمند-خیابان جمهوری-جمهوری ۱۳-نبش سازمان تسلیحات ارتشی</div>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useCartStore } from '~base/stores/shopCart';
import { useShopStore } from '~base/stores/shop';

const shop = useShopStore()
const { shopData } = storeToRefs(shop);

const shopCart = useCartStore()
const { products, amountCart } = storeToRefs(shopCart)
</script>