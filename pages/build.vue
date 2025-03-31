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
  <div class="container mx-auto pt-12">
    <img class="w-full h-auto rounded-2xl" src="https://media.discordapp.net/attachments/1293190535003242508/1347976363868684361/image.png?ex=67e8cf11&is=67e77d91&hm=07917a832e0b1d10afae7dc773cf1692acb4fee75a96014c69c0f364770baa81&=&format=webp&quality=lossless" alt="">
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