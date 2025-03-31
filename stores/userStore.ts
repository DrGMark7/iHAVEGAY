// stores/userStore.ts
import { defineStore } from 'pinia'

interface UserState {
  user: string | null
  userId: string | null
  token: string | null
  isAuthenticated: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    token: null,
    userId: null,
    isAuthenticated: false
  }),
  
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated
  },
  
  actions: {
    async checkAuthState() {
      const token = localStorage.getItem('token')
      const user_id = localStorage.getItem('user_id')
      const username = localStorage.getItem('username')
      if (token) {
        this.token = token
        this.isAuthenticated = true
        this.userId = user_id
        this.user = username
        }else{    
            this.logout()
        }
    },
    async login(username: string, password: string) {
      try {
        const config = useRuntimeConfig()
        const response = await $fetch<any>(`${config.public.apiUrl}api/v1/auth/login`, {
          method: 'POST',
          body: { username, password }
        })
        
        if (response.access_token) {
          this.token = response.access_token
          this.user = response.username
          this.userId = response.user_id
          this.isAuthenticated = true
          
          // เก็บ token ไว้ใน localStorage
          localStorage.setItem('token', response.access_token)
          localStorage.setItem('user_id', response.user_id)
          localStorage.setItem('username', response.username)
          
          return this.user
        } else {
          throw new Error(response.message || 'เข้าสู่ระบบไม่สำเร็จ')
        }
      } catch (error: any) {
        console.error('Login error:', error)
        throw new Error(error?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ')
      }
    },
    
    async register(userData: {
      username: string
      password: string
      email: string
    }) {
      try {
        const config = useRuntimeConfig()
        const response = await $fetch<any>(`${config.public.apiUrl}api/v1/auth/register`, {
          method: 'POST',
          body: {...userData, role: 'user'}
        }) 
        console.log(response)
        
        if (response.is_active) {
          this.login(userData.username, userData.password)
          
          return this.user
        } else {
          throw new Error(response.message || 'สมัครสมาชิกไม่สำเร็จ')
        }
      } catch (error: any) {
        console.error('Register error:', error)
        throw new Error(error?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก')
      }
    },
    
    async fetchUser() {
      try {
        const token = localStorage.getItem('token')
        
        if (!token) {
          return null
        }
        
        this.token = token
        const config = useRuntimeConfig()
        const response = await $fetch<any>(`${config.public.apiUrl}api/v1/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (response.success) {
          this.user = response.user
          this.isAuthenticated = true
          return this.user
        } else {
          this.logout()
          return null
        }
      } catch (error) {
        console.error('Fetch user error:', error)
        this.logout()
        return null
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    }
  }
})