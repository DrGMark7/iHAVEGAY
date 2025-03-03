import { readFileSync } from 'fs'
import { resolve } from 'path'

const loadJson = (filename: string) => {
  const file = readFileSync(resolve(`./server/db/${filename}.json`), 'utf-8')
  return JSON.parse(file)
}

export default defineEventHandler(async (event) => {
  try {
    const { type } = getQuery(event)

    if (!type) {
      return {
        success: false,
        message: 'Type parameter is required'
      }
    }

    let data
    switch (type) {  
      case 'case':
        data = loadJson('case') // เพิ่ม api
        break
      case 'powerSupply':
        data = loadJson('powersupply') // เพิ่ม api
        break
      case 'mainboard':
        data = loadJson('mainboard') // เพิ่ม api
        break
      case 'ram':
        data = loadJson('ram') // เพิ่ม api
        break
      case 'vga':
        data = loadJson('vga') // เพิ่ม api
        break
      case 'ssd':
        data = loadJson('ssd')// เพิ่ม api
        break
      case 'm2':
        data = loadJson('m2') // เพิ่ม api
        break
      case 'cpu':
        data = loadJson('cpu')// เพิ่ม api
        break
      default:
        return {
          success: false,
          message: 'Invalid product type'
        }
    }
    console.log(data)
    return {
      success: true,
      data: data
    }

  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Failed to get products'
    }
  }
})