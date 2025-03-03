<script setup>
import { storeToRefs } from 'pinia'
import { useBuildStore } from '~/stores/buildStore'
import { useProductStore } from '~/stores/productStore'
const productStore = useProductStore()
await productStore.loadAllProducts()
const buildStore = useBuildStore()

const props = defineProps({
    products: {
        type: String,
        required: true
    }
})

const addProduct = (product, type, price) => {
    buildStore.addProduct(product, type, price)
}
</script>

<template>
    <div class="">
        <div class="grid grid-cols-4 gap-8 justify-center items-stretch">
            <div class="card  bg-base-100 w-auto shadow-sm" v-for="product in productStore[props.products]"
                :key="product.id">
                <figure class="w-auto h-auto relative">
                    <h1 class="text-sm font-bold badge badge-primary mb-1 absolute top-2 left-2">{{ product.brand }}</h1>
                    <img :src="product.imgUrl" :alt="product.title" width="320" height="320"
                        class="w-full h-full object-cover">
                </figure>
                <div class="card-body">
                    <div class="h-14 mb-2">
                        <h2 class="card-title text-sm line-clamp-2">{{ product.title }}</h2>
                    </div>
                    <div class="card-actions justify-between ">
                        <p class="text-xl font-bold">{{ product.price }} ฿</p>
                        <button @click="addProduct(product, props.products, product.price)" class="btn btn-primary btn-sm text-xl">+</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
