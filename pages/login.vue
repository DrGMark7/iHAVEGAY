<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '~/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  username: '',
  password: ''
})

const errors = reactive({
  username: '',
  password: '',
  general: ''
})

const isLoading = ref(false)

const validateForm = () => {
  let isValid = true
  
  // เคลียร์ errors เดิม
  errors.username = ''
  errors.password = ''
  errors.general = ''
  
  // ตรวจสอบ email
  if (!form.username) {
    errors.username = 'กรุณาระบุชื่อผู้ใช้'
    isValid = false
  }
  
  // ตรวจสอบ password
  if (!form.password) {
    errors.password = 'กรุณาระบุรหัสผ่าน'
    isValid = false
  }
  
  return isValid
}

const login = async () => {
  if (!validateForm()) return
  
  isLoading.value = true
  
  try {
    await userStore.login(form.username, form.password)
    router.push('/')
  } catch (error) {
    errors.general = error?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div class="max-w-md w-full bg-base-100 rounded-lg shadow-xl p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">เข้าสู่ระบบ</h1>
        <p class="text-gray-600">ยินดีต้อนรับกลับมา</p>
      </div>
      
      <form @submit.prevent="login" class="space-y-6">
        <!-- แสดงข้อผิดพลาดทั่วไป -->
        <div v-if="errors.general" class="alert alert-error text-sm">
          {{ errors.general }}
        </div>
        
        <!-- อีเมล -->
        <div>
          <label class="label">
            <span class="label-text font-medium">ชื่อผู้ใช้</span>
          </label>
          <input 
            v-model="form.username"
            type="text"
            class="input input-bordered w-full"
            :class="{'input-error': errors.username}"
            placeholder="ชื่อผู้ใช้"
          />
          <label v-if="errors.username" class="label">
            <span class="label-text-alt text-error">{{ errors.username }}</span>
          </label>
        </div>
        
        <!-- รหัสผ่าน -->
        <div>
          <label class="label">
            <span class="label-text font-medium">รหัสผ่าน</span>
          </label>
          <input 
            v-model="form.password"
            type="password"
            class="input input-bordered w-full"
            :class="{'input-error': errors.password}"
            placeholder="รหัสผ่าน"
          />
          <label v-if="errors.password" class="label">
            <span class="label-text-alt text-error">{{ errors.password }}</span>
          </label>
          <label class="label">
            <NuxtLink to="/forgot-password" class="label-text-alt link link-hover text-primary">
              ลืมรหัสผ่าน?
            </NuxtLink>
          </label>
        </div>
        
        <!-- ปุ่มเข้าสู่ระบบ -->
        <button 
          type="submit" 
          class="btn btn-primary w-full"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loading loading-spinner loading-sm mr-2"></span>
          เข้าสู่ระบบ
        </button>
        
        <!-- ลิงก์ไปหน้าสมัครสมาชิก -->
        <div class="text-center mt-4">
          <p>
            ยังไม่มีบัญชี? 
            <NuxtLink to="/register" class="text-primary hover:underline">สมัครสมาชิก</NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>