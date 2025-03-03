<script setup>
import { useProductStore } from '~/stores/productStore'
import { useBuildStore } from '~/stores/buildStore'
import { storeToRefs } from 'pinia'
import GridProduct from '~/components/main/GridProduct.vue'
import Aside from '~/components/main/Aside.vue'
const productStore = useProductStore()
const buildStore = useBuildStore()
const { onSelect } = storeToRefs(buildStore)


</script>

<template>
  <div class="container mx-auto grid grid-cols-4 gap-12">
    <div class="col-span-1">
        <Aside />
    </div>
    <div class="col-span-3">
        <GridProduct :products="onSelect" />
    </div>
  </div>
</template>