import productsData from '../data/products.json'
import categoriesData from '../data/categories.json'
import productVariantsData from '../data/product-variants.json'
import imagesData from '../data/images.json'
import colorsData from '../data/colors.json'
import sizesData from '../data/sizes.json'

export interface Product {
  id: number
  category_id: number
  name: string
  description: string
  subtitle: string
  header: string
  sku: string
  stock: number
  price: number
  created_at: string
  categories?: {
    name: string
  }
}

export interface Category {
  id: number
  name: string
  created_at: string
}

export interface ProductVariant {
  id: number
  product_id: number
  size_id: number
  color_id: number
  sku: string
  price: number
  stock: number
  created_at: string
  colors?: {
    name: string
  }
  sizes?: {
    name: string
  }
}

export interface Image {
  id: number
  product_id: number
  path: string
  created_at: string
}

export interface Color {
  id: number
  name: string
}

export interface Size {
  id: number
  name: string
}

export const products: Product[] = productsData
export const categories: Category[] = categoriesData
export const productVariants: ProductVariant[] = productVariantsData
export const images: Image[] = imagesData
export const colors: Color[] = colorsData
export const sizes: Size[] = sizesData

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductsByCategory(categoryId: number): Product[] {
  return products.filter(product => product.category_id === categoryId)
}

export function getAllProducts(): Product[] {
  return products
}

export function getAllCategories(): Category[] {
  return categories
}

export function getProductVariants(productId: number): ProductVariant[] {
  return productVariants.filter(variant => variant.product_id === productId)
}

export function getProductImages(productId: number): Image[] {
  return images.filter(image => image.product_id === productId)
}

export function getProductWithVariants(productId: number) {
  const product = getProductById(productId)
  if (!product) return null

  const variants = getProductVariants(productId)
  const productImages = getProductImages(productId)

  return {
    ...product,
    variants,
    images: productImages
  }
} 