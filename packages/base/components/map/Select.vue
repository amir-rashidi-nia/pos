<template>
    <div class="mpage block h-full w-full p-0 m-0 text-black">
        <LMap ref="map" :use-global-leaflet="false" @click="clickHandler" :zoom="zoom" :center="coordinate">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
            <LMarker :lat-lng="markerCoord" draggable @moveend="drag"></LMarker>
        </LMap>
    </div>
</template>
<script setup>
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import publicService from "~base/services/public.service.js";

const props = defineProps({
    initialCoords: {
        required: false,
        type: Array,
        default: [36.30959215409138, 59.52993392944336],
    },
    zoom: {
       type: Number,
       default: 12 
    }
});
const emit = defineEmits(["sendData"]);
const coordinate = ref(null);
const markerCoord = ref(null);
const map = ref(null);

onBeforeMount(() => {
    coordinate.value = props?.initialCoords;
    markerCoord.value = props?.initialCoords ? props.initialCoords : null;
});

function clickHandler(e) {
    coordinate.value = Object.values(e.latlng);
    markerCoord.value = Object.values(e.latlng);
    sendData(e.latlng);
}
function drag(e) {
    coordinate.value = Object.values(e.target._latlng);
    markerCoord.value = Object.values(e.target._latlng);
    sendData(e.target._latlng);
}
async function sendData(coords) {
    try {
        const response = await publicService.getAddressByCoords(coords.lat, coords.lng)
        emit("sendData", { coords, address: response?.object?.address?.length > 0 ? response?.object?.address[0] : null });
    } catch (err) {
    }
}
</script>
<style>
#map {
    z-index: 10;
}
</style>