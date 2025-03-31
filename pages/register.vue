<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '~/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  email: ''
})

const errors = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  general: ''
})

const isLoading = ref(false)

const validateForm = () => {
  let isValid = true
  
  // เคลียร์ errors เดิม
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  
  // ตรวจสอบ username
  if (!form.username) {
    errors.username = 'กรุณาระบุชื่อผู้ใช้'
    isValid = false
  } else if (form.username.length < 4) {
    errors.username = 'ชื่อผู้ใช้ต้องมีอย่างน้อย 4 ตัวอักษร'
    isValid = false
  }
  
  // ตรวจสอบ password
  if (!form.password) {
    errors.password = 'กรุณาระบุรหัสผ่าน'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
    isValid = false
  }
  
  // ตรวจสอบการยืนยันรหัสผ่าน
  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'รหัสผ่านไม่ตรงกัน'
    isValid = false
  }
  
  return isValid
}

const register = async () => {
  if (!validateForm()) return
  
  isLoading.value = true
  
  try {
    await userStore.register({
      username: form.username,
      password: form.password,
      email: form.email
    })
    
    router.push('/')
  } catch (error) {
    errors.general = error?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-300  px-4">
    <div class="max-w-md w-full bg-base-100 rounded-lg shadow-xl p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">สมัครสมาชิก</h1>
        <p class="text-gray-600">สร้างบัญชีของคุณเพื่อเริ่มใช้งาน</p>
      </div>
      
      <form @submit.prevent="register" class="space-y-6">
        <!-- แสดงข้อผิดพลาดทั่วไป -->
        <div v-if="errors.general" class="alert alert-error text-sm">
          {{ errors.general }}
        </div>
        
        <!-- ชื่อผู้ใช้ -->
        <div>
          <label class="label">
            <span class="label-text font-medium">ชื่อผู้ใช้ <span class="text-error">*</span></span>
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

        <div>
          <label class="label">
            <span class="label-text font-medium">อีเมล <span class="text-error">*</span></span>
          </label>
          <input 
            v-model="form.email"
            type="text"
            class="input input-bordered w-full"
            :class="{'input-error': errors.email}"
            placeholder="อีเมล"
          />
          <label v-if="errors.email" class="label">
            <span class="label-text-alt text-error">{{ errors.email }}</span>
          </label>
        </div>
        
        <!-- รหัสผ่าน -->
        <div>
          <label class="label">
            <span class="label-text font-medium">รหัสผ่าน <span class="text-error">*</span></span>
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
        </div>
        
        <!-- ยืนยันรหัสผ่าน -->
        <div>
          <label class="label">
            <span class="label-text font-medium">ยืนยันรหัสผ่าน <span class="text-error">*</span></span>
          </label>
          <input 
            v-model="form.confirmPassword"
            type="password"
            class="input input-bordered w-full"
            :class="{'input-error': errors.confirmPassword}"
            placeholder="ยืนยันรหัสผ่าน"
          />
          <label v-if="errors.confirmPassword" class="label">
            <span class="label-text-alt text-error">{{ errors.confirmPassword }}</span>
          </label>
        </div>
        
        <!-- ปุ่มสมัครสมาชิก -->
        <button 
          type="submit" 
          class="btn btn-primary w-full"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="loading loading-spinner loading-sm mr-2"></span>
          สมัครสมาชิก
        </button>
        
        <!-- ลิงก์ไปหน้าเข้าสู่ระบบ -->
        <div class="text-center mt-4">
          <p>
            มีบัญชีอยู่แล้ว? 
            <NuxtLink to="/login" class="text-primary hover:underline">เข้าสู่ระบบ</NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>