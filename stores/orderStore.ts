// stores/orderStore.ts
import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import { useBuildStore } from './buildStore'    
import type { shipping_details, Order, OrderState, OrderResponse, Product } from '~/types'
import { useProductStore } from './productStore'



export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
  }),
  
  getters: {
    getOrders: (state) => state.orders,
    getCurrentOrder: (state) => state.currentOrder,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getPendingOrders: (state) => state.orders.filter(order => order.status === 'pending'),
    getCompletedOrders: (state) => state.orders.filter(order => 
      ['confirmed', 'processing', 'shipped', 'delivered'].includes(order.status)
    )
  },
  
  actions: {
    // สร้าง order ใหม่
    async placeOrder(shippingDetails: any, paymentMethod: 'promptpay' | 'bank_transfer') {
      this.loading = true
      this.error = null
      
      try {
        const userStore = useUserStore()
        const buildStore = useBuildStore()
        const token = userStore.getToken
        
        if (!token) {
          throw new Error('กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ')
        }

        const config = useRuntimeConfig()
        const response = await $fetch<any>(`${config.public.apiUrl}api/v1/orders/create-with-details`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            computer_set:{
                cpu_id: (buildStore.cpu as any).cpu_id as string,
                ram_id: (buildStore.ram as any).ram_id as string,
                mainboard_id: (buildStore.mainboard as any).mainboard_id as string,
                gpu_id: (buildStore.gpu as any).gpu_id as string,
                case_id: (buildStore.case as any).case_id as string,
                psu_id: (buildStore.psu as any).psu_id as string,
                ssd_id: (buildStore.ssd as any).ssd_id as string,
                m2_id: (buildStore.m2 as any).m2_id as string,
            },
            total_price: buildStore.totalPrice as number,
            shipping_details: {
                user_id: userStore.userId,
                name: userStore.user,
                email: shippingDetails.email,
                phone: shippingDetails.phone,
                shipping_address: shippingDetails.address,
                shipping_status : 'pending',
                note: shippingDetails.note,
            }
          },
        })
        
        if (response.status) {
          this.currentOrder = response
          return response
        } else {
          throw new Error(response.message || 'ไม่สามารถสร้างออเดอร์ได้')
        }
      } catch (error: any) {
        this.error = error.message || 'เกิดข้อผิดพลาดในการสั่งซื้อ'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // ดึงข้อมูล orders ทั้งหมดของผู้ใช้
    async fetchUserOrders() {
      this.loading = true
      this.error = null
      
      try {
        const userStore = useUserStore()
        const token = userStore.getToken
        
        if (!token) {
          throw new Error('กรุณาเข้าสู่ระบบ')
        }
        
        const config = useRuntimeConfig()
        const response = await $fetch<any>(`${config.public.apiUrl}api/v1/orders?user_id=${userStore.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (Array.isArray(response)) {
          const ordersWithProducts = await Promise.all(
            response.map(async (order) => {
              const products = await this.mapProductDetails(order.order_details)
              return {
                ...order,
                order_details: products
              }
            })
          )
          
          this.orders = ordersWithProducts
          console.log(ordersWithProducts)
          return ordersWithProducts
        } else {
          throw new Error(response.message || 'ไม่สามารถดึงข้อมูลออเดอร์ได้')
        }
      } catch (error: any) {
        console.log(error)
        this.error = error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // ดึงข้อมูล order เดียวตาม ID
    async fetchOrderById(orderId: string) {
      this.loading = true
      this.error = null
      
      try {
        const userStore = useUserStore()
        const token = userStore.getToken
        
        if (!token) {
          throw new Error('กรุณาเข้าสู่ระบบ')
        }
        
        const config = useRuntimeConfig()
        const response = await $fetch<any>(`${config.public.apiUrl}api/v1/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (response._id) {
          this.currentOrder = response
          return response
        } else {
          throw new Error(response.message || 'ไม่พบออเดอร์')
        }
      } catch (error: any) {
        this.error = error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // อัปเดตสถานะการชำระเงิน
    async updatePaymentStatus(orderId: string, slipUrl: string) {
      this.loading = true
      this.error = null
      
      try {
        const userStore = useUserStore()
        const token = userStore.getToken
        
        if (!token) {
          throw new Error('กรุณาเข้าสู่ระบบ')
        }
        
        const config = useRuntimeConfig()
        const response = await $fetch<any>(`${config.public.apiUrl}api/v1/orders/${orderId}/payment`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            slipUrl,
            paymentStatus: 'processing'
          }
        })
        
        if (response._id) {
          this.currentOrder = response
          
          // อัปเดต order ในรายการ orders ถ้ามีอยู่แล้ว
          const index = this.orders.findIndex(order => order.order_id === orderId)
          if (index !== -1) {
            this.orders[index] = response
          }
          
          return response
        } else {
          throw new Error(response.message || 'ไม่สามารถอัปเดตสถานะการชำระเงินได้')
        }
      } catch (error: any) {
        this.error = error.message || 'เกิดข้อผิดพลาดในการอัปเดตสถานะการชำระเงิน'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // ยกเลิก order
    async cancelOrder(orderId: string, reason: string) {
      this.loading = true
      this.error = null
      
      try {
        const userStore = useUserStore()
        const token = userStore.getToken
        
        if (!token) {
          throw new Error('กรุณาเข้าสู่ระบบ')
        }
        
        const config = useRuntimeConfig()
        const response = await $fetch<any>(`${config.public.apiUrl}api/v1/orders/${orderId}/cancel`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            reason,
            status: 'cancelled'
          }
        })
        
        if (response.order_id) {
          // อัปเดต order ในรายการ orders ถ้ามีอยู่แล้ว
          const index = this.orders.findIndex(order => order.order_id === orderId)
          if (index !== -1) {
            this.orders[index] = response
          }
          
          if (this.currentOrder && this.currentOrder.order_id === orderId) {
            this.currentOrder = response
          }
          
          return response
        } else {
          throw new Error(response.message || 'ไม่สามารถยกเลิกออเดอร์ได้')
        }
      } catch (error: any) {
        this.error = error.message || 'เกิดข้อผิดพลาดในการยกเลิกออเดอร์'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // เคลียร์ state เมื่อผู้ใช้ออกจากระบบ
    clearOrderState() {
      this.orders = []
      this.currentOrder = null
      this.error = null
    },

    // เพิ่ม action ใหม่
    async mapProductDetails(orderDetails: any) {
      const productStore = useProductStore()
      
      // รอให้โหลดข้อมูลสินค้าทั้งหมดก่อน
      await productStore.loadAllProducts()
      
      const mappedDetails = [
        {
          type: 'cpu',
          product: productStore.cpu.find((p: any) => p.cpu_id === orderDetails.cpu_id)
        },
        {
          type: 'ram',
          product: productStore.ram.find((p: any) => p.ram_id === orderDetails.ram_id)
        },
        {
          type: 'mainboard',
          product: productStore.mainboard.find((p: any) => p.mainboard_id === orderDetails.mainboard_id)
        },
        {
          type: 'gpu',
          product: productStore.gpu.find((p: any) => p.gpu_id === orderDetails.gpu_id)
        },
        {
          type: 'case',
          product: productStore.case.find((p: any) => p.case_id === orderDetails.case_id)
        },
        {
          type: 'psu',
          product: productStore.psu.find((p: any) => p.psu_id === orderDetails.psu_id)
        },
        {
          type: 'ssd',
          product: orderDetails.ssd_id ? productStore.ssd.find((p: any) => p.ssd_id === orderDetails.ssd_id) : null
        },
        {
          type: 'm2',
          product: orderDetails.m2_id ? productStore.m2.find((p: any) => p.m2_id === orderDetails.m2_id) : null
        }
      ]

      return mappedDetails
        .filter(item => item.product !== null)
        .map(({ type, product }) => ({
          productId: (product as Product)[`${type}_id`],
          productType: type,
          title: (product as Product)?.title,
          price: (product as Product)?.price,
          imgUrl: (product as Product)?.imgUrl,
          quantity: 1
        }))
    }
  }
})