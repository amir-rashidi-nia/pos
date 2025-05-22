<template>
    <div class="mpage block text-white w-full h-full m-0 p-0">
        <LMap :options="{ zoomControl }" id="map" :use-global-leaflet="false" :zoom="zoom" :center="coordinate">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
            <LMarker :lat-lng="coordinate"></LMarker>
        </LMap>
    </div>
</template>
<script setup>
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
const props = defineProps({
    coordinate: {
        required: true,
        default: [36.30959215409138, 59.52993392944336],
    },
    zoom: {
       type: Number,
       default: 12 
    },
    zoomControl: {
        type: Boolean,
        default: true
    }
});
</script>
<style>
#map {
    z-index: 10;
}
</style>