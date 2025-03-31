<script setup>
import { useBuildStore } from '~/stores/buildStore'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '~/stores/orderStore'
const orderStore = useOrderStore()
const buildStore = useBuildStore()
const buildStoreToRefs = storeToRefs(buildStore)

const formData = ref({
    name: '',
    email: '',
    phone: '',
    address: '',
    note: ''
})

// ตรวจสอบว่าเลือกสินค้าครบหรือไม่
const isComplete = computed(() => {
    return Object.keys(buildStoreToRefs).every(key => {
        if (key === 'totalPrice' || key === 'onSelect') return true
        return Object.keys(buildStoreToRefs[key].value).length > 0
    })
})

// ฟังก์ชันสำหรับส่ง order
const submitOrder = async () => {
    try {
        const result = await orderStore.placeOrder(formData.value, 'promptpay')
        if(result){
            await navigateTo('/orders')
        }
    } catch (error) {
        console.error('Failed to submit order:', error)
    }
}
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <!-- หัวข้อ -->
        <h1 class="text-2xl font-bold mb-6">ตรวจสอบรายการสั่งซื้อ</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- ฟอร์มข้อมูลลูกค้า -->
            <div class="bg-base-200 p-6 rounded-xl">
                <h2 class="text-xl font-semibold mb-4">ข้อมูลการจัดส่ง</h2>

                <form @submit.prevent="submitOrder" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="label">ชื่อ</label>
                            <input v-model="formData.name" type="text" class="input input-bordered w-full"
                                required />
                        </div>
                    </div>

                    <div>
                        <label class="label">อีเมล</label>
                        <input v-model="formData.email" type="email" class="input input-bordered w-full" required />
                    </div>

                    <div>
                        <label class="label">เบอร์โทรศัพท์</label>
                        <input v-model="formData.phone" type="tel" class="input input-bordered w-full" required />
                    </div>

                    <div>
                        <label class="label">ที่อยู่จัดส่ง</label>
                        <textarea v-model="formData.address" class="textarea textarea-bordered w-full" rows="3"
                            required></textarea>
                    </div>

                    <div>
                        <label class="label">หมายเหตุ</label>
                        <textarea v-model="formData.note" class="textarea textarea-bordered w-full" rows="2"></textarea>
                    </div>
                </form>
            </div>

            <!-- สรุปรายการสินค้า -->
            <div class="bg-base-200 p-6 rounded-xl">
                <h2 class="text-xl font-semibold mb-4">สรุปรายการสินค้า</h2>

                <div class="space-y-4">
                    <div class="max-h-96 overflow-y-auto bg-base-200">
                        <div v-if="buildStoreToRefs.cpu.value?.title" class="flex gap-4 p-4 bg-base-100 rounded-lg">
                            <img :src="buildStoreToRefs.cpu.value.imgUrl" class="w-20 h-20 object-cover rounded" />
                            <div>
                                <p class="font-semibold">{{ buildStoreToRefs.cpu.value.title }}</p>
                                <p class="text-primary">{{ buildStoreToRefs.cpu.value.price.toLocaleString('th-TH') }}
                                    บาท</p>
                            </div>
                        </div>
                        <div v-if="buildStoreToRefs.m2.value?.title" class="flex gap-4 p-4 bg-base-100 rounded-lg">
                            <img :src="buildStoreToRefs.m2.value.imgUrl" class="w-20 h-20 object-cover rounded" />
                            <div>
                                <p class="font-semibold">{{ buildStoreToRefs.m2.value.title }}</p>
                                <p class="text-primary">{{ buildStoreToRefs.m2.value.price.toLocaleString('th-TH') }}
                                    บาท</p>
                            </div>
                        </div>
                        <div v-if="buildStoreToRefs.psu.value?.title"
                            class="flex gap-4 p-4 bg-base-100 rounded-lg">
                            <img :src="buildStoreToRefs.psu.value.imgUrl"
                                class="w-20 h-20 object-cover rounded" />
                            <div>
                                <p class="font-semibold">{{ buildStoreToRefs.psu.value.title }}</p>
                                <p class="text-primary">{{
                                    buildStoreToRefs.psu.value.price.toLocaleString('th-TH') }} บาท</p>
                            </div>
                        </div>
                        <div v-if="buildStoreToRefs.mainboard.value?.title"
                            class="flex gap-4 p-4 bg-base-100 rounded-lg">
                            <img :src="buildStoreToRefs.mainboard.value.imgUrl"
                                class="w-20 h-20 object-cover rounded" />
                            <div>
                                <p class="font-semibold">{{ buildStoreToRefs.mainboard.value.title }}</p>
                                <p class="text-primary">{{
                                    buildStoreToRefs.mainboard.value.price.toLocaleString('th-TH') }} บาท</p>
                            </div>
                        </div>
                        <div v-if="buildStoreToRefs.ram.value?.title" class="flex gap-4 p-4 bg-base-100 rounded-lg">
                            <img :src="buildStoreToRefs.ram.value.imgUrl" class="w-20 h-20 object-cover rounded" />
                            <div>
                                <p class="font-semibold">{{ buildStoreToRefs.ram.value.title }}</p>
                                <p class="text-primary">{{ buildStoreToRefs.ram.value.price.toLocaleString('th-TH') }}
                                    บาท</p>
                            </div>
                        </div>
                        <div v-if="buildStoreToRefs.gpu.value?.title" class="flex gap-4 p-4 bg-base-100 rounded-lg">
                            <img :src="buildStoreToRefs.gpu.value.imgUrl" class="w-20 h-20 object-cover rounded" />
                            <div>
                                <p class="font-semibold">{{ buildStoreToRefs.gpu.value.title }}</p>
                                <p class="text-primary">{{ buildStoreToRefs.gpu.value.price.toLocaleString('th-TH') }}
                                    บาท</p>
                            </div>
                        </div>
                        <div v-if="buildStoreToRefs.ssd.value?.title" class="flex gap-4 p-4 bg-base-100 rounded-lg">
                            <img :src="buildStoreToRefs.ssd.value.imgUrl" class="w-20 h-20 object-cover rounded" />
                            <div>
                                <p class="font-semibold">{{ buildStoreToRefs.ssd.value.title }}</p>
                                <p class="text-primary">{{ buildStoreToRefs.ssd.value.price.toLocaleString('th-TH') }}
                                    บาท</p>
                            </div>
                        </div>
                        <div v-if="buildStoreToRefs.case.value?.title" class="flex gap-4 p-4 bg-base-100 rounded-lg">
                            <img :src="buildStoreToRefs.case.value.imgUrl" class="w-20 h-20 object-cover rounded" />
                            <div>
                                <p class="font-semibold">{{ buildStoreToRefs.case.value.title }}</p>
                                <p class="text-primary">{{ buildStoreToRefs.case.value.price.toLocaleString('th-TH') }}
                                    บาท</p>
                            </div>
                        </div>
                    </div>
                    <!-- CPU -->




                    <!-- แสดงรายการอื่นๆ เช่นเดียวกัน -->

                    <!-- ยอดรวม -->
                    <div class="border-t pt-4 mt-6">
                        <div class="flex justify-between items-center text-lg font-bold">
                            <span>ยอดรวมทั้งสิ้น</span>
                            <span class="text-primary">
                                {{ buildStoreToRefs.totalPrice.value.toLocaleString('th-TH') }} บาท
                            </span>
                        </div>
                    </div>

                    <!-- ปุ่มยืนยันการสั่งซื้อ -->
                    <button class="btn btn-primary w-full mt-6" @click="submitOrder">
                        ยืนยันการสั่งซื้อ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
