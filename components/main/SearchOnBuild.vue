<script setup>
import { useBuildStore } from '~/stores/buildStore'
const buildStore = useBuildStore()
const { onSelect } = storeToRefs(buildStore)
</script>

<template>
    <div class="bg-base-100 p-5 rounded-xl">
        <div class="text-xl font-bold mb-2">{{ onSelect.toUpperCase() }}</div>
        <input type="text" class="input input-bordered w-full max-w-xs rounded-2xl" placeholder="ค้นหาตรงนี้ไอสัส">
    </div>
</template>


