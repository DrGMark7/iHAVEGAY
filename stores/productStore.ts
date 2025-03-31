import { defineStore } from 'pinia'
import type { ProductState, ProductResponse, Product } from '~/types/product'




export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    case: [],
    psu: [],
    mainboard: [],
    ram: [],
    gpu: [],
    ssd: [],
    m2: [],
    cpu: [],
    bestSeller: [],
    recommend: [],
    bestPair: []
  }),
  
  actions: {
    async loadCase() {
      if (this.case.length !== 0) return this.case
      try {
        const res = await $fetch('/api/getProducts', {
          query: { type: 'case' }
        })
        const data = res as ProductResponse
        if (data.success) {
          this.case = data.data as object[]
          return this.case
        }
        return []
      } catch (error) {
        console.error(error)
        return []
      }
    },
    
    async loadPsu(){
      if (this.psu.length !== 0) return this.psu
      try {
        const res = await $fetch('/api/getProducts', {
          query: { type: 'psu' }
        })
        const data = res as ProductResponse
        if (data.success) {
          this.psu = data.data as object[]
          return this.psu
        }
        return []
      } catch (error) {
        console.error(error)
        return []
      }
    },
    
    async loadMainboard(){
      if (this.mainboard.length !== 0) return this.mainboard
      try {
        const res = await $fetch('/api/getProducts', {
          query: { type: 'mainboard' }
        })
        const data = res as ProductResponse
        if (data.success) {
          this.mainboard = data.data as object[]
          return this.mainboard
        }
        return []
      } catch (error) {
        console.error(error)
        return []
      }
    },
    
    async loadRam(){
      if (this.ram.length !== 0) return this.ram
      try {
        const res = await $fetch('/api/getProducts', {
          query: { type: 'ram' }
        })
        const data = res as ProductResponse
        if (data.success) {
          this.ram = data.data as object[]
          return this.ram
        }
        return []
      } catch (error) {
        console.error(error)
        return []
      }
    },
    
    async loadGpu(){
      if (this.gpu.length !== 0) return this.gpu
      try {
        const res = await $fetch('/api/getProducts', {
          query: { type: 'gpu' }
        })
        const data = res as ProductResponse
        if (data.success) {
          this.gpu = data.data as object[]
          return this.gpu
        }
        return []
      } catch (error) {
        console.error(error)
        return []
      }
    },
    
    async loadSsd(){
      if (this.ssd.length !== 0) return this.ssd
      try {
        const res = await $fetch('/api/getProducts', {
          query: { type: 'ssd' }
        })
        const data = res as ProductResponse
        if (data.success) {
          this.ssd = data.data as object[]
          return this.ssd
        }
        return []
      } catch (error) {
        console.error(error)
        return []
      }
    },
    
    async loadM2(){
      if (this.m2.length !== 0) return this.m2
      try {
        const res = await $fetch('/api/getProducts', {
          query: { type: 'm2' }
        })
        const data = res as ProductResponse
        if (data.success) {
          this.m2 = data.data as object[]
          return this.m2
        }
        return []
      } catch (error) {
        console.error(error)
        return []
      }
    },
    
    async loadCpu(){
      if (this.cpu.length !== 0) return this.cpu
      try {
        const res = await $fetch('/api/getProducts', {
          query: { type: 'cpu' }
        })
        const data = res as ProductResponse
        if (data.success) {
          this.cpu = data.data as Product[]
          return this.cpu
        }
        return []
      } catch (error) {
        console.error(error)
        return []
      }
    },
    async compatibleCpu(cpu_id: string){
      if(!cpu_id) return
      const config = useRuntimeConfig()
      const res = await $fetch(`${config.public.apiUrl}api/v1/admin/products/compatible-mainboards/${cpu_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = res as any
      this.mainboard = data
      return data
    },
    async loadBestSeller(){
      if(this.bestSeller.length !== 0) return this.bestSeller
      const config = useRuntimeConfig()
      const res = await $fetch(`${config.public.apiUrl}api/v1/admin/products/top-selling?limit=8`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = res as any
      this.bestSeller = data
      return this.bestSeller
    },
    async loadRecommend(){
      if(this.recommend.length !== 0) return this.recommend
      const config = useRuntimeConfig()
      const res = await $fetch(`${config.public.apiUrl}api/v1/admin/products/recommended?limit=8`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = res as any
      this.recommend = data
      return this.recommend
    },
    async loadByPriceRange(min: number, max: number, type: string){
      const config = useRuntimeConfig()
      const res = await $fetch(`${config.public.apiUrl}api/v1/admin/products/price-range?category=${type.toUpperCase()}&min_price=${min}&max_price=${max}&limit=20`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = res as any
      this[type] = data.sort((a: any, b: any) => a.price - b.price)
      return this[type]
    },
    async loadBestPair(){
      if(this.bestPair.length !== 0) return this.bestPair
      const config = useRuntimeConfig()
      const res = await $fetch(`${config.public.apiUrl}api/v1/admin/analytics/frequently-bought-together?limit=20`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = res as any
      this.bestPair = data
      return this.bestPair
    },
  
    async loadAllProducts() {
      await Promise.all([
        this.loadCase(),
        this.loadPsu(),
        this.loadMainboard(),
        this.loadRam(),
        this.loadGpu(),
        this.loadSsd(),
        this.loadM2(),
        this.loadCpu(),
        this.loadBestSeller(),
        this.loadRecommend(),
        this.loadBestPair()
      ])
    }
  }
})
