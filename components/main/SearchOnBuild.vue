<script setup>
import { useBuildStore } from '~/stores/buildStore'
import { ref } from 'vue'
import { useProductStore } from '~/stores/productStore'

const productStore = useProductStore()
const buildStore = useBuildStore()
const { onSelect } = storeToRefs(buildStore)

const minPrice = ref(0)
const maxPrice = ref(100000)
const priceRanges = [
  { min: 0, max: 5000, label: '0 - 5,000 บาท' },
  { min: 5000, max: 10000, label: '5,000 - 10,000 บาท' },
  { min: 10000, max: 20000, label: '10,000 - 20,000 บาท' },
  { min: 20000, max: 30000, label: '20,000 - 30,000 บาท' },
  { min: 30000, max: 50000, label: '30,000 - 50,000 บาท' },
  { min: 50000, max: 100000, label: '50,000+ บาท' }
]

const selectPriceRange = async(min, max) => {
  minPrice.value = min
  maxPrice.value = max

}

const submit = async() => {
  await productStore.loadByPriceRange(minPrice.value, maxPrice.value, onSelect.value)
}
</script>

<template>
  <div class="bg-base-100 p-5 rounded-xl space-y-4">
    <div class="text-xl font-bold">{{ onSelect.toUpperCase() }}</div>
    
    <!-- Price Range -->
    <div>
      <div class="text-sm font-semibold mb-2">ช่วงราคา</div>
      <div class="grid grid-cols-2 gap-2">
        <div v-for="range in priceRanges" 
             :key="range.label"
             @click="selectPriceRange(range.min, range.max)"
             class="btn btn-sm btn-outline hover:bg-primary hover:text-white"
             :class="{ 'btn-primary': minPrice === range.min && maxPrice === range.max }">
          {{ range.label }}
        </div>
      </div>
    </div>

    <!-- Custom Price Range -->
    <div class="flex gap-2 items-center">
      <input type="number" 
             v-model="minPrice"
             class="input input-bordered input-sm w-28" 
             placeholder="ราคาต่ำสุด">
      <span>-</span>
      <input type="number"
             v-model="maxPrice" 
             class="input input-bordered input-sm w-28"
             placeholder="ราคาสูงสุด">
      <button @click="submit" class="btn btn-primary btn-sm">ตกลง</button>
    </div>
  </div>
</template>


