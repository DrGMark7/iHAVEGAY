import { defineStore } from 'pinia'

interface ProductState {
  case: object[]
  powerSupply: object[]
  mainboard: object[]
  ram: object[]
  vga: object[]
  ssd: object[]
  m2: object[]
  cpu: object[]
}

interface ProductResponse {
  success: boolean
  data: object[]
  message: string
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    case: [],
    powerSupply: [],
    mainboard: [],
    ram: [],
    vga: [],
    ssd: [],
    m2: [],
    cpu: [],
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
    
    async loadPowerSupply(){
      if (this.powerSupply.length !== 0) return this.powerSupply
      try {
        const res = await $fetch('/api/getProducts', {
          query: { type: 'powerSupply' }
        })
        const data = res as ProductResponse
        if (data.success) {
          this.powerSupply = data.data as object[]
          return this.powerSupply
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
    
    async loadVga(){
      if (this.vga.length !== 0) return this.vga
      try {
        const res = await $fetch('/api/getProducts', {
          query: { type: 'vga' }
        })
        const data = res as ProductResponse
        if (data.success) {
          this.vga = data.data as object[]
          return this.vga
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
          this.cpu = data.data as object[]
          return this.cpu
        }
        return []
      } catch (error) {
        console.error(error)
        return []
      }
    },
  
    async loadAllProducts(){
      await this.loadCase()
      await this.loadPowerSupply()
      await this.loadMainboard()
      await this.loadRam()
      await this.loadVga()
      await this.loadSsd()
      await this.loadM2()
      await this.loadCpu()
    }
  }
})
