import { useProductStore} from '~/stores/productStore'

export default defineNuxtRouteMiddleware(async () => {
  const store = useProductStore()
  
  try {
    await store.loadAllProducts()
  } catch (error) {
    console.error('Failed to load products:', error)
  }
})