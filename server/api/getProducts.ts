import { readFileSync } from 'fs'
import { resolve } from 'path'

interface ProductResponse {
  success: boolean;
  message?: string;
  data?: any;
}

const loadJson = (filename: string) => {
  const file = readFileSync(resolve(`./server/db/${filename}.json`), 'utf-8')
  return JSON.parse(file)
}

export default defineEventHandler(async (event): Promise<ProductResponse> => {
  try {
    const { type } = getQuery(event)
    const config = useRuntimeConfig()
    if (!type) {
      return {
        success: false,
        message: 'Type parameter is required'
      }
    }

    let data
    switch (type) {  
      case 'case':
         data = await $fetch<any>(`${config.public.apiUrl}api/v1/cases`)
         data = data.map((item: any) => ({ ...item, product_id: item.case_id }))
        // data = loadJson('case') // เพิ่ม api
        break
      case 'psu':
        // data = loadJson('powersupply') // เพิ่ม api
         data = await $fetch<any>(`${config.public.apiUrl}api/v1/PSUs`)
         data = data.map((item: any) => ({ ...item, product_id: item.psu_id }))

        break
      case 'mainboard':
        data = await $fetch<any>(`${config.public.apiUrl}api/v1/mainboards`)
        data = data.map((item: any) => ({ ...item, product_id: item.mainboard_id }))

        break
      case 'ram':
        data = await $fetch<any>(`${config.public.apiUrl}api/v1/RAMs`)
        data = data.map((item: any) => ({ ...item, product_id: item.ram_id }))

        break
      case 'gpu':
        data = await $fetch<any>(`${config.public.apiUrl}api/v1/GPUs`)
        data = data.map((item: any) => ({ ...item, product_id: item.gpu_id }))

        break
      case 'ssd':
        data = await $fetch<any>(`${config.public.apiUrl}api/v1/storage/ssds`)
        data = data.map((item: any) => ({ ...item, product_id: item.ssd_id }))

        break
      case 'm2':
        data = await $fetch<any>(`${config.public.apiUrl}api/v1/storage/m2s`)
        data = data.map((item: any) => ({ ...item, product_id: item.m2_id }))

        break
      case 'cpu':
        data = await $fetch<any>(`${config.public.apiUrl}api/v1/CPUs`)
        data = data.map((item: any) => ({ ...item, product_id: item.cpu_id }))

        break
      default:
        return {
          success: false,
          message: 'Invalid product type'
        }
    }
    return {
      success: true,
      data: data,
      message: 'Products fetched successfully'
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Failed to get products'
    }
  }
})