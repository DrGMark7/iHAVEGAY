import { useUserStore } from '@/stores/userStore'

export default defineNuxtRouteMiddleware(async(to) => {
    if(import.meta.server) return

    const userStore = useUserStore()
    await userStore.checkAuthState()
    
    // if(!userStore.isLoggedIn){
    //     // ป้องกันการ redirect ซ้ำ
    //     if(to.path.includes('/login')) return
        
    //     // redirect แบบใช้ name แทน
    //     return navigateTo('/login', { 
    //         replace: true,
    //         redirectCode: 301
    //     })
    // }
})