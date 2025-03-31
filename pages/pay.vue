<!-- pages/payment.vue -->
<script setup >
import { useBuildStore } from '~/stores/buildStore'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '~/stores/orderStore'
const orderStore = useOrderStore()
const buildStore = useBuildStore()
const buildStoreToRefs = storeToRefs(buildStore)

const paymentStatus = ref('pending')

const selectedMethod = ref('promptpay')

// สร้าง QR Code สำหรับ PromptPay
const generateQRCode = () => {
  paymentStatus.value = 'processing'
}

// ข้อมูลบัญชีธนาคาร
const bankAccounts = [

  {
    bank: 'ไทยพาณิชย์',
    accountName: 'บริษัท คอมพิวเตอร์ จำกัด',
    accountNumber: '987-6-54321-0',
    icon: 'https://play-lh.googleusercontent.com/j-9a3HbVZoX337-MLdkmYt75yUfN5ahis8rOnE09972cFLdVn7Z5Dzu3Guo8ldUv2H4x=w240-h480-rw'
  }
]

// อัพโหลดสลิป
const uploadSlip = async (event) => {
  const file = (event.target).files?.[0]
  if (file) {
    // TODO: อัพโหลดไฟล์ไปยัง API
    paymentStatus.value = 'processing'
  }
}

// ตรวจสอบสถานะการชำระเงิน
const checkPaymentStatus = async () => {
  await orderStore.placeOrder(orderStore.currentOrder._id, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png')
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <!-- หัวข้อ -->
      <h1 class="text-2xl font-bold mb-6">ชำระเงิน</h1>

      <!-- แสดงยอดที่ต้องชำระ -->
      <div class="bg-base-200 p-6 rounded-xl mb-8">
        <div class="text-center">
          <p class="text-lg">ยอดที่ต้องชำระ</p>
          <p class="text-3xl font-bold text-primary">
            {{ buildStoreToRefs.totalPrice.value.toLocaleString('th-TH') }} บาท
          </p>
        </div>
      </div>

      <!-- เลือกวิธีชำระเงิน -->
      <div class="space-y-4">
        <!-- PromptPay -->
        <div 
          class="card bg-base-200 cursor-pointer hover:bg-base-300"
          :class="{ 'border-2 border-primary': selectedMethod === 'promptpay' }"
          @click="selectedMethod = 'promptpay'"
        >
          <div class="card-body">
            <div class="flex items-center gap-4">
              <img src="https://firebasestorage.googleapis.com/v0/b/nexsets-dev.appspot.com/o/payment%2Fpromptpay-desktop.webp?alt=media&token=2e82481e-9ea3-4bb2-ba61-f8ca485fc4ec" alt="PromptPay" class="w-12 h-12" />
              <div>
                <h3 class="font-semibold">PromptPay QR Code</h3>
                <p class="text-sm opacity-70">สแกนจ่ายด้วย Mobile Banking ทุกธนาคาร</p>
              </div>
            </div>
          </div>
        </div>

        <!-- โอนผ่านบัญชีธนาคาร -->
        <div 
          class="card bg-base-200 cursor-pointer hover:bg-base-300"
          :class="{ 'border-2 border-primary': selectedMethod === 'bank_transfer' }"
          @click="selectedMethod = 'bank_transfer'"
        >
          <div class="card-body">
            <div class="flex items-center gap-4">
              <div class="flex gap-2">
                <img 
                  v-for="account in bankAccounts" 
                  :key="account.bank"
                  :src="account.icon" 
                  :alt="account.bank"
                  class="w-12 h-12"
                />
              </div>
              <div>
                <h3 class="font-semibold">โอนผ่านบัญชีธนาคาร</h3>
                <p class="text-sm opacity-70">โอนเงินและอัพโหลดสลิป</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- แสดงรายละเอียดตามวิธีที่เลือก -->
      <div v-if="selectedMethod" class="mt-8">
        <!-- PromptPay -->
        <div v-if="selectedMethod === 'promptpay'" class="text-center">
          <div class="bg-white p-8 rounded-xl inline-block">
            <!-- แสดง QR Code -->
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png" 
              alt="QR Code"
              class="w-64 h-64 mx-auto"
            />
          </div>
          <p class="mt-4 font-semibold">สแกนเพื่อชำระเงิน</p>
          <button 
            class="btn btn-primary mt-4"
            @click="checkPaymentStatus"
          >
            ตรวจสอบสถานะการชำระเงิน
          </button>
        </div>

        <!-- โอนผ่านบัญชี -->
        <div v-else-if="selectedMethod === 'bank_transfer'" class="space-y-6">
          <!-- รายละเอียดบัญชี -->
          <div v-for="account in bankAccounts" :key="account.bank" class="card bg-base-100">
            <div class="card-body">
              <div class="flex items-center gap-4">
                <img :src="account.icon" :alt="account.bank" class="w-12 h-12" />
                <div>
                  <h3 class="font-semibold">{{ account.bank }}</h3>
                  <p>{{ account.accountName }}</p>
                  <p class="font-mono">{{ account.accountNumber }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- อัพโหลดสลิป -->
          <div class="card bg-base-100">
            <div class="card-body">
              <h3 class="font-semibold mb-4">อัพโหลดสลิปการโอนเงิน</h3>
              <input 
                type="file" 
                accept="image/*"
                class="file-input file-input-bordered w-full"
                @change="uploadSlip"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- แสดงสถานะการชำระเงิน -->
      <div v-if="paymentStatus !== 'pending'" class="mt-8">
        <div 
          class="alert"
          :class="{
            'alert-info': paymentStatus === 'processing',
            'alert-success': paymentStatus === 'success',
            'alert-error': paymentStatus === 'failed'
          }"
        >
          <div>
            <span v-if="paymentStatus === 'processing'">กำลังตรวจสอบการชำระเงิน...</span>
            <span v-else-if="paymentStatus === 'success'">ชำระเงินสำเร็จ</span>
            <span v-else>การชำระเงินล้มเหลว กรุณาลองใหม่อีกครั้ง</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>