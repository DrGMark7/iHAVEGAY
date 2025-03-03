<script setup>
import { useBuildStore } from '~/stores/buildStore'
import { storeToRefs } from 'pinia'
import GridProduct from '~/components/main/GridProduct.vue'
import SearchOnBuild from '~/components/main/SearchOnBuild.vue'
import Aside from '~/components/main/Aside.vue'
const buildStore = useBuildStore()
const { onSelect } = storeToRefs(buildStore)


</script>

<template>
  <div class="container mx-auto">
    <img class="w-full h-auto rounded-2xl" src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/categories/1713773859.jpg" alt="">
    <div class="my-12"></div>
  </div>
  <div class="container mx-auto grid grid-cols-4 gap-12">

    <div class="col-span-1">
        <Aside />
    </div>
    <div class="col-span-3">
        <SearchOnBuild />
        <div class="my-7"></div>
        <GridProduct :products="onSelect" />
    </div>
  </div>
</template>