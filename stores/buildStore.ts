import { defineStore } from 'pinia'

interface BuildState {
  case: object
  powerSupply: object
  mainboard: object
  ram: object
  vga: object
  ssd: object
  m2: object
  cpu: object,
  totalPrice: number,
  onSelect: string
}
type ComponentKey = 'case' | 'powerSupply' | 'mainboard' | 'ram' | 'vga' | 'ssd' | 'm2' | 'cpu';


export const useBuildStore = defineStore('build', {
  state: (): BuildState => ({
    case: {},
    powerSupply: {},
    mainboard: {},
    ram: {},
    vga: {},
    ssd: {},
    m2: {},
    cpu: {},
    totalPrice: 0,
    onSelect:'cpu'
  }),
  
  getters: {
    isComponentSelected: (state) => (type: ComponentKey) => {
      return state[type] && Object.keys(state[type]).length > 0
    }
  },
  
  actions: {
    async selectProduct(path: string) {
      this.onSelect = path 
    },
    async addProduct(product: object, type: ComponentKey, price: string) {
        if(this[type] && typeof this[type] === 'object' && this[type] !== null){
            const oldItem = this[type] as { price?: string };
            if (oldItem.price) {
                this.totalPrice -= parseInt(oldItem.price.replace(/,/g, ""), 10)
            }
        }
      this[type] = product
      this.totalPrice += parseInt(price.replace(/,/g, ""), 10)
    },
    async removeProduct(type: ComponentKey) {
      if(this[type] && typeof this[type] === 'object' && this[type] !== null){
        const oldItem = this[type] as { price?: string };
        if (oldItem.price) {
          this.totalPrice -= parseInt(oldItem.price.replace(/,/g, ""), 10)
        }
      }
      this[type] = {}
    },
    async clearProduct() {
      this.case = {}
      this.powerSupply = {}
      this.mainboard = {}
      this.ram = {}
      this.vga = {}
      this.ssd = {}
      this.m2 = {}
      this.cpu = {}
      this.totalPrice = 0
    }

  }
})
