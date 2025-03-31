export type shipping_details = {
    name: string
    email: string
    phone: string
    shipping_address: string,
    shipping_status: string,
    user_id: Number,
    note?: string
  }

export type Order = {
    order_id: string
    order_details: any
    order_date: Date
    userId: string
    total_price: number
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    shipping_details: shipping_details
}
  
export type OrderResponse = {
    success: boolean
    data: Order[]
    message: string
}
export type OrderState = {
    orders: Order[]
    currentOrder: Order | null
    loading: boolean
    error: string | null
  }
  