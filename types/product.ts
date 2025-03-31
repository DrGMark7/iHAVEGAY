export type ProductState = {
    case: object[]
    psu: object[]
    mainboard: object[]
    ram: object[]
    gpu: object[]
    ssd: object[]
    m2: object[]
    cpu: object[]
    [key: string]: any
  }

export type ProductResponse = {
    success: boolean
    data: object[]
    message: string
} 

export type Product = {
    title: string
    price: number
    imgUrl: string
    product_id: string
    [key: string]: any
  }

