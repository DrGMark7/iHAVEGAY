<script setup>
import { useBuildStore } from '~/stores/buildStore'
import { storeToRefs } from 'pinia'

const buildStore = useBuildStore()
const buildStoreToRefs = storeToRefs(buildStore)

const menu = ref([
    {
        name: 'CPU',
        path: 'cpu',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cpu injected-svg" viewBox="0 0 16 16" data-src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/icon/cpu.svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0m-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"></path>
</svg> `,
    },
    {
        name: 'Mainboard',
        path: 'mainboard',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-motherboard injected-svg" viewBox="0 0 16 16" data-src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/icon/motherboard.svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M11.5 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m-10 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zM5 3a1 1 0 0 0-1 1h-.5a.5.5 0 0 0 0 1H4v1h-.5a.5.5 0 0 0 0 1H4a1 1 0 0 0 1 1v.5a.5.5 0 0 0 1 0V8h1v.5a.5.5 0 0 0 1 0V8a1 1 0 0 0 1-1h.5a.5.5 0 0 0 0-1H9V5h.5a.5.5 0 0 0 0-1H9a1 1 0 0 0-1-1v-.5a.5.5 0 0 0-1 0V3H6v-.5a.5.5 0 0 0-1 0zm0 1h3v3H5zm6.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
  <path d="M1 2a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-2H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 9H1V8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6H1V5H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 2zm1 11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"></path>
</svg> `,
    },
    {
        name: 'VGA',
        path: 'vga',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gpu-card injected-svg" viewBox="0 0 16 16" data-src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/icon/gpu-card.svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M4 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0m7.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"></path>
  <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .5.5V4h13.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H2v2.5a.5.5 0 0 1-1 0V2H.5a.5.5 0 0 1-.5-.5m5.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M9 8a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0"></path>
  <path d="M3 12.5h3.5v1a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 1-.5-.5zm4 1v-1h4v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5"></path>
</svg>`,
    },
    {
        name: 'Ram',
        path: 'ram',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-memory injected-svg" viewBox="0 0 16 16" data-src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/icon/memory.svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.586a1 1 0 0 0 .707-.293l.353-.353a.5.5 0 0 1 .708 0l.353.353a1 1 0 0 0 .707.293H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm.5 1h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5m5 0h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5m4.5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zM2 10v2H1v-2zm2 0v2H3v-2zm2 0v2H5v-2zm3 0v2H8v-2zm2 0v2h-1v-2zm2 0v2h-1v-2zm2 0v2h-1v-2z"></path>
</svg>`,
    },
    {
        name: 'SSD',
        path: 'ssd',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-device-hdd injected-svg" viewBox="0 0 16 16" data-src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/icon/device-hdd.svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M12 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-7.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M5 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M8 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2"></path>
  <path d="M12 7a4 4 0 0 1-3.937 4c-.537.813-1.02 1.515-1.181 1.677a1.102 1.102 0 0 1-1.56-1.559c.1-.098.396-.314.795-.588A4 4 0 0 1 8 3a4 4 0 0 1 4 4m-1 0a3 3 0 1 0-3.891 2.865c.667-.44 1.396-.91 1.955-1.268.224-.144.483.115.34.34l-.62.96A3 3 0 0 0 11 7"></path>
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"></path>
</svg>`,
    },
    {
        name: 'M.2',
        path: 'm2',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-device-hdd injected-svg" viewBox="0 0 16 16" data-src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/icon/device-hdd.svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M12 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-7.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M5 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M8 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2"></path>
  <path d="M12 7a4 4 0 0 1-3.937 4c-.537.813-1.02 1.515-1.181 1.677a1.102 1.102 0 0 1-1.56-1.559c.1-.098.396-.314.795-.588A4 4 0 0 1 8 3a4 4 0 0 1 4 4m-1 0a3 3 0 1 0-3.891 2.865c.667-.44 1.396-.91 1.955-1.268.224-.144.483.115.34.34l-.62.96A3 3 0 0 0 11 7"></path>
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"></path>
</svg>`,
    }
    ,
    {
        name: 'PowerSupply',
        path: 'powerSupply',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-safe2 injected-svg" viewBox="0 0 16 16" data-src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/icon/safe2.svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h12A1.5 1.5 0 0 1 16 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 1 14.5V14H.5a.5.5 0 0 1 0-1H1V9H.5a.5.5 0 0 1 0-1H1V4H.5a.5.5 0 0 1 0-1H1zM2.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5z"></path>
  <path d="M5.035 8h1.528q.072-.277.214-.516l-1.08-1.08A3.5 3.5 0 0 0 5.035 8m1.369-2.303 1.08 1.08q.24-.142.516-.214V5.035a3.5 3.5 0 0 0-1.596.662M9 5.035v1.528q.277.072.516.214l1.08-1.08A3.5 3.5 0 0 0 9 5.035m2.303 1.369-1.08 1.08q.142.24.214.516h1.528a3.5 3.5 0 0 0-.662-1.596M11.965 9h-1.528q-.072.277-.214.516l1.08 1.08A3.5 3.5 0 0 0 11.965 9m-1.369 2.303-1.08-1.08q-.24.142-.516.214v1.528a3.5 3.5 0 0 0 1.596-.662M8 11.965v-1.528a2 2 0 0 1-.516-.214l-1.08 1.08A3.5 3.5 0 0 0 8 11.965m-2.303-1.369 1.08-1.08A2 2 0 0 1 6.563 9H5.035c.085.593.319 1.138.662 1.596M4 8.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0m4.5-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2"></path>
</svg>`,
    },
    {
        name: 'Case',
        path: 'case',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pc injected-svg" viewBox="0 0 16 16" data-src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/icon/case.svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M5 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 14a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1m2 0a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1M5 1.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M5.5 3h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1"></path>
</svg>`,
    },

])

const selectProduct = (type) => {
    buildStore.selectProduct(type)
}
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
</script>

<template>
    <div class="bg-base-100 rounded-xl p-4 flex flex-col gap-4 rounded-2xl">
        <div class="flex justify-between items-center">
            <p class="text-lg font-bold">ยอดรวมทั้งสิ้น</p>
            <p class="text-lg font-bold text-primary">{{ formatNumber(buildStoreToRefs.totalPrice.value) }} ฿</p>
        </div>
        <button v-for="item in menu"  @click="selectProduct(item.path)"class="hover:bg-base-300 bg-base-200 p-5 rounded-2xl">
            <div v-if="!buildStore.isComponentSelected(item.path)" class="flex items-center gap-2  text-lg">
                <div class="font-bold" v-html="item.svg"></div>
                <p class="font-bold">{{ item.name }}</p>
            </div>
            <div v-else>
                <span class="flex justify-between mb-2">
                    <span class="font-bold">{{ item.name }}</span>
                    <span class="font-bold">{{ buildStore[item.path]?.price }} ฿</span>
                </span>
                <span class="flex gap-1">
                    <img :src="buildStore[item.path]?.imgUrl" class="w-12" :alt="buildStore[item.path]?.title">
                    <p class="text-xs opacity-70">{{ buildStore[item.path].title }}</p>

                </span>
                <span class="flex flex-row w-full items-center gap-2 justify-center mt-2">
                    <NuxtLink :to="`product/${buildStore[item.path].title}`" class="btn btn-sm">รายละเอียด</NuxtLink>
                    <button @click="buildStore.removeProduct(item.path)" class="btn btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                </span>
            </div>
        </button>
        <div class="flex flex-col gap-2">
            <button class="btn btn-primary">สั่งประกอบ</button>
            <button @click="buildStore.clearProduct()" class="btn">รีเซ็ต</button>

        </div>
    </div>

</template>
