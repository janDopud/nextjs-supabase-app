export interface Profile {
  id: string
  email: string
  role: 'admin' | 'customer'
  is_blocked: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  owner_id: string
  title: string
  description: string
  price: number
  currency: string
  quantity_available: number
  category: string
  status: 'draft' | 'pending' | 'approved' | 'rejected'
  is_active: boolean
  created_at: string
  updated_at: string
  images?: ProductImage[]
  owner?: Profile
}

export interface ProductImage {
  id: string
  product_id: string
  image_path: string
  display_order: number
  created_at: string
}

export interface CreateProductData {
  title: string
  description: string
  price: number
  currency?: string
  quantity_available: number
  category: string
}