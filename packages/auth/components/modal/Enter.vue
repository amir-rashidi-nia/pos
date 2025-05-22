<template>
    <UiDialog variant="simple" v-model="showEnterModal" @closed="closeModalHAndler">
        <AuthSwiperEnter />
    </UiDialog>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useAuthBaseStore } from '~base/stores/auth';

const authBase = useAuthBaseStore()
const { showEnterModal, forPurchase } = storeToRefs(authBase);

const router = useRouter();

function closeModalHAndler() {
    let currentPath = router.currentRoute.value.path;
    let queryParams = router.currentRoute.value.query;
    router.push({
        path: currentPath,
        query: { ...queryParams, forLogin: undefined }
    });
    forPurchase.value = false;
}
</script>