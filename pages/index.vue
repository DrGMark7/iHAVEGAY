<template>
  <div>
    <!-- Banner Carousel แบบปรับปรุง -->
    <div class="container mx-auto px-4 mb-12 max-w-screen-xl pt-12">
      <Hero />
    </div>

    <!-- สินค้าแนะนำ (ปรับปรุง) -->
     <!-- <div class="container mx-auto px-4 mb-12 max-w-screen-xl">
      <section class="container mx-auto px-4 mb-12">
      <h2 class="text-2xl font-bold mb-6">สินค้าแนะนำ</h2>
      <div class="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="product in productStore.recommend" 
          :key="`featured-${product._id}`"
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
        >
          <div class="absolute top-3 left-3 z-10 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-bold">
              แนะนำ
            </div>
          <figure v-if="product.imgUrl" class="h-40">
            <img 
              :src="product.imgUrl" 
              :alt="product.title" 
              class="w-full h-full object-contain"
            />
          </figure>
          <div class="card-body">
            <h3 class="card-title text-lg line-clamp-2">{{ product.title }}</h3>
            <p class="text-primary text-2xl font-bold">{{ product.price }} บาท</p>
            <div class="card-actions justify-between">
              <button class="btn btn-primary btn-sm">รายละเอียด</button>
              <button class="btn btn-outline btn-sm btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      </section>

     </div> -->


    <!-- สินค้าขายดี (ปรับปรุง) -->
    <section class="bg-gradient-to-r from-base-300 to-base-200 py-20 mb-20 mx-auto max-w-screen-xl">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold">สินค้าขายดี</h2>
          <NuxtLink to="/bestsellers" class="text-primary hover:underline flex items-center">
            ดูทั้งหมด
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div 
            v-for="product in productStore.bestSeller" 
            class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
          >
            <div class="absolute top-3 left-3 z-10 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-bold">
              ขายดี
            </div>
            <figure v-if="product.imgUrl" class="relative overflow-hidden h-56">
              <img  
                :src="product.imgUrl" 
                :alt="product.title" 
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </figure>
            <div class="card-body">
              <h3 class="card-title text-lg line-clamp-2">{{ product.title }}</h3>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">ขายแล้ว {{ product.sold_quantity }} ชิ้น</span>
              </div>
              <p class="text-primary text-2xl font-bold">{{ product.price }} บาท</p>
              <div class="card-actions justify-between items-center mt-3">
                <button class="btn btn-primary btn-sm">รายละเอียด</button>
                <button class="btn btn-circle btn-sm btn-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 mb-20 max-w-screen-xl">
      <h2 class="text-3xl font-bold mb-8">ขายดี 5 อันดับ</h2>
      <div class="space-y-6">
        <div 
          v-for="(product, index) in productStore.bestSeller.slice(0, 5)" 
          :key="`top5-${product._id}`"
          class="flex items-center bg-base-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div class="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-primary to-primary-focus text-white font-bold text-2xl">
            {{ index + 1 }}
          </div>
          <img v-if="product.imgUrl" :src="product.imgUrl" :alt="product.title" class="w-32 h-32 object-cover flex-shrink-0" />
          <div class="flex-grow p-4">
            <h3 class="font-bold text-lg mb-1">{{ product.title }}</h3>
            <div class="flex items-center text-sm text-gray-500 mb-2">
              <span class="bg-yellow-100 text-yellow-800 rounded-full px-2 py-0.5 text-xs mr-2">HOT</span>
              <span>ขายแล้ว {{ product.sold_quantity }} ชิ้น</span>
            </div>
            <p class="text-primary text-xl font-bold">{{ product.price }} บาท</p>
          </div>
          <div class="p-4 flex gap-2">
            <button class="btn btn-primary">รายละเอียด</button>
            <button class="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-r from-base-300 to-base-200 py-20 mx-auto max-w-screen-xl">
      <div class="container mx-auto px-4">
        <div class="mb-10 text-center">
          <h2 class="text-3xl font-bold mb-2">แนะนำสินค้าราคาถูก</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">อุปกรณ์คุณภาพดีในราคาที่คุณสามารถเข้าถึงได้ เหมาะสำหรับผู้ที่มีงบประมาณจำกัด</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div 
            v-for="product in productStore.recommend" 
            class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group border border-primary/10"
          >
            <div class="absolute top-3 right-3 z-10 bg-green-500 text-white rounded-full px-3 py-1 text-sm font-bold">
              คุ้มค่า
            </div>
            <figure v-if="product.imgUrl" class="relative overflow-hidden h-56">
              <img 
                :src="product.imgUrl" 
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div class="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-center py-1 font-bold">
                ราคาพิเศษ
              </div>
            </figure>
            <div class="card-body">
              <h3 class="card-title text-lg line-clamp-2">{{ product.title }}</h3>
              <div class="flex items-center gap-2 mb-1">
                <span class="line-through text-gray-400">{{ (parseInt(product.price) * 1.1).toLocaleString('th-TH') }} บาท</span>
                <span class="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">-10%</span>
              </div>
              <p class="text-green-600 text-2xl font-bold">{{ product.price }} บาท</p>
              <div class="card-actions justify-between items-center mt-3">
                <button class="btn btn-success btn-sm">รายละเอียด</button>
                <button class="btn btn-circle btn-sm btn-outline btn-success">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 mb-20 max-w-screen-xl">
      <h2 class="text-3xl font-bold mb-8">สินค้าที่มักซื้อด้วยกัน</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="pair in frequentlyBoughtTogether" 
             class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div class="p-6">
            <div class="flex items-center gap-4">
              <!-- สินค้าชิ้นที่ 1 -->
              <div v-if="pair.product_pair.product1?.imgUrl" class="flex-1">
                <img :src="pair.product_pair.product1.imgUrl" :alt="pair.product_pair.product1.title" 
                     class="w-full h-32 object-contain mb-3" />
                <h3 class="font-semibold line-clamp-2">{{ pair.product_pair.product1.title }}</h3>
                <p class="text-primary font-bold">{{ pair.product_pair.product1.price }} บาท</p>
              </div>
              <div class="text-2xl font-bold text-gray-400">+</div>

              <div class="flex-1">
                <img :src="pair.product_pair.product2.imgUrl" :alt="pair.product_pair.product2.title" 
                     class="w-full h-32 object-contain mb-3" />
                <h3 class="font-semibold line-clamp-2">{{ pair.product_pair.product2.title }}</h3>
                <p class="text-primary font-bold">{{ pair.product_pair.product2.price }} บาท</p>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm text-gray-500">ราคารวม</p>
                  <p class="text-2xl font-bold text-primary">
                    {{ pair.product_pair.product1.price + pair.product_pair.product2.price }} บาท
                  </p>
                </div>
                <button class="btn btn-primary">
                  ซื้อทั้งคู่
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- เพิ่มส่วน CTA -->
    <section class="py-20 bg-primary text-primary-content">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">เริ่มจัดสเปคคอมพิวเตอร์ของคุณ</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">ให้เราช่วยคุณเลือกอุปกรณ์ที่เหมาะสมกับความต้องการและงบประมาณของคุณ</p>
        <NuxtLink to="/build" class="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none">
          เริ่มจัดสเปคเลย
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useProductStore } from '~/stores/productStore'
import Hero from '~/components/main/Hero.vue'
const productStore = useProductStore()


onMounted(() => {
})







const frequentlyBoughtTogether = computed(() => {
  return productStore.bestPair
})

</script>

<style scoped>
/* Animation for carousel */
.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.5s ease;
}
.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
}

/* Line clamp for titles */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Hover animations */
.group:hover .btn-primary {
  background-color: var(--primary-focus);
}

/* เพิ่ม CSS เพื่อจำกัดขนาดรูปภาพ */
.card figure {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.card figure img {
  max-height: 100%;
  width: auto;
  max-width: 100%;
}
</style>