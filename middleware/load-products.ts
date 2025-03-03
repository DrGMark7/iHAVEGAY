import { useProductStore} from '~/stores/productStore'

export default defineNuxtRouteMiddleware(async () => {
  const store = useProductStore()
  
  try {

    await Promise.all([
      store.loadCase?.(),
      store.loadPowerSupply?.(),
      store.loadMainboard?.(),
      store.loadRam?.(),
      store.loadVga?.(),
      store.loadSsd?.(),
      store.loadM2?.(),
      store.loadCpu?.(),
    ])
  } catch (error) {
    console.error('Failed to load products:', error)
  }
})