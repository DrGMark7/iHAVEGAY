<script setup>
import { storeToRefs } from 'pinia'
import { useOrderStore } from '~/stores/orderStore'

const orderStore = useOrderStore()
const orders = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  try {
    orders.value = await orderStore.fetchUserOrders()
    console.log(orders.value)
    loading.value = false
  } catch (e) {
    console.error('Error loading orders:', e)
    error.value = 'เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์'
    loading.value = false
  }
})
</script>

<template>
  <div class="container mx-auto p-4 min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-center">ประวัติการสั่งซื้อ</h1>
    
    <div v-if="loading" class="flex justify-center">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else-if="error" class="alert alert-error shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>{{ error }}</span>
    </div>

    <div v-else class="space-y-6">
      <div v-for="order in orders" :key="order.order_id" 
           class="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div class="card-body p-6">
          <!-- หัวข้อออเดอร์ -->
          <div class="flex justify-between items-center border-b pb-4">
            <div class="space-y-2">
              <h2 class="text-2xl font-bold flex items-center gap-3">
                <span>คำสั่งซื้อ #{{ order.order_id }}</span>
              <div :class="{
                  'badge badge-lg badge-warning': order.status === 'Pending',
                  'badge badge-lg badge-success': ['Confirmed', 'Processing'].includes(order.status),
                  'badge badge-lg badge-info': ['Shipped'].includes(order.status),
                  'badge badge-lg badge-primary': order.status === 'Delivered',
                  'badge badge-lg badge-error': order.status === 'Cancelled'
              }">
                {{ order.status }}
              </div>
            </h2>
              <p class="text-gray-600">
                สั่งซื้อเมื่อ: {{ new Date(order.order_date).toLocaleDateString('th-TH', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-primary">
              ฿{{ order.total_price.toLocaleString('th-TH') }}
            </p>
            </div>
          </div>

          <!-- รายละเอียดสินค้า -->
          <div class="my-6">
            <h3 class="text-lg font-semibold mb-4">รายการสินค้า</h3>
            <div class="divide-y max-h-[300px] overflow-y-auto">
            <div v-for="item in order.order_details" :key="item.productId" 
                   class="py-4 flex justify-between items-center hover:bg-base-200 rounded-lg transition-colors duration-200">
                <div class="flex items-center gap-6">
                <img :src="item.imgUrl" alt="product" 
                       class="w-20 h-20 object-cover rounded-lg shadow" />
                <div>
                    <p class="font-semibold text-lg">{{ item.title }}</p>
                    <p class="text-gray-600">จำนวน: {{ item.quantity }} ชิ้น</p>
                    <p class="font-medium text-primary">
                      ฿{{ item.price?.toLocaleString('th-TH') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- รายละเอียดการจัดส่ง -->
          <div class="bg-base-200 rounded-xl p-6 mt-4">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              รายละเอียดการจัดส่ง
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-600">ชื่อผู้รับ</p>
                    <p class="font-medium">{{ order.shipping_details.name }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-600">เบอร์โทร</p>
                    <p class="font-medium">{{ order.shipping_details.phone }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p class="text-sm text-gray-600">อีเมล</p>
                    <p class="font-medium">{{ order.shipping_details.email }}</p>
                  </div>
                </div>
              </div>
              <div class="space-y-3">
                <div>
                  <p class="text-sm text-gray-600">ที่อยู่จัดส่ง</p>
                  <p class="font-medium mt-1">{{ order.shipping_details.shipping_address }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">หมายเหตุ</p>
                  <p class="font-medium mt-1">{{ order.shipping_details.note || '-' }}</p>
                </div>
            <div>
                  <p class="text-sm text-gray-600">สถานะการจัดส่ง</p>
                  <div class="mt-1">
                    <span :class="{
                      'badge badge-lg badge-warning': order.shipping_details.shipping_status === 'pending',
                      'badge badge-lg badge-info': order.shipping_details.shipping_status === 'processing',
                      'badge badge-lg badge-success': order.shipping_details.shipping_status === 'delivered'
                    }">
                      {{ order.shipping_details.shipping_status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            </div>
            
          <!-- ปุ่มดำเนินการ -->
          <div class="flex justify-end gap-4 mt-6">
              <NuxtLink :to="`/orders/${order.order_id}`" 
                     class="btn btn-primary btn-lg">
                ดูรายละเอียด
              </NuxtLink>
              <button v-if="order.status === 'pending'"
                    class="btn btn-error btn-lg"
                      @click="orderStore.cancelOrder(order.order_id, 'ยกเลิกโดยผู้ใช้')">
              ยกเลิกคำสั่งซื้อ
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>