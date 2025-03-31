import { defineStore } from 'pinia'

interface BuildState {
  case: object
  psu: object
  mainboard: object
  ram: object
  gpu: object
  ssd: object
  m2: object
  cpu: object,
  totalPrice: number,
  onSelect: string
}
type ComponentKey = 'case' | 'psu' | 'mainboard' | 'ram' | 'gpu' | 'ssd' | 'm2' | 'cpu';


export const useBuildStore = defineStore('build', {
  state: (): BuildState => ({
    case: {},
    psu: {},
    mainboard: {},
    ram: {},
    gpu: {},
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
    async selectProduct(path: ComponentKey) {
      if(path === 'mainboard' && this.cpu && typeof this.cpu === 'object' && this.cpu !== null){
        const productStore = useProductStore()
        const compatibleCpu = await productStore.compatibleCpu((this.cpu as any).cpu_id)
        console.log("compatibleCpu", compatibleCpu)
      }
      this.onSelect = path 
    },
    async addProduct(product: object, type: ComponentKey, price: number) {
        if(this[type] && typeof this[type] === 'object' && this[type] !== null){
            const oldItem = this[type] as { price?: number };
            if (oldItem.price) {
                this.totalPrice -= oldItem.price
            }
        }
      this[type] = product
      this.totalPrice += price  
    },
    async removeProduct(type: ComponentKey) {
      if(this[type] && typeof this[type] === 'object' && this[type] !== null){
        const oldItem = this[type] as { price?: number };
        if (oldItem.price) {
          this.totalPrice -= oldItem.price
        }
      }
      this[type] = {}
    },
    async clearProduct() {
      this.case = {}
      this.psu = {}
      this.mainboard = {}
      this.ram = {}
      this.gpu = {}
      this.ssd = {}
      this.m2 = {}
      this.cpu = {}
      this.totalPrice = 0
    }

  }
})
