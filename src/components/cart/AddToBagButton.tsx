"use client"

import { useCart } from "@/lib/cart"

interface AddToBagButtonProps {
  productId: number
  productName: string
  productPrice: number
  productImage: string
  variantId?: number
  color?: string
  size?: string
  disabled?: boolean
  children: React.ReactNode
}

export default function AddToBagButton({
  productId,
  productName,
  productPrice,
  productImage,
  variantId,
  color,
  size,
  disabled = false,
  children
}: AddToBagButtonProps) {
  const { addItem } = useCart()

  const handleAddToBag = () => {
    addItem({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
      image: productImage,
      variantId,
      color,
      size
    })
  }

  return (
    <button
      onClick={handleAddToBag}
      disabled={disabled}
      className="bg-white text-lg border border-caddi-blue text-caddi-black font-medium py-4 px-38 rounded-full hover:bg-caddi-blue hover:text-white transition-all duration-100 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  )
} 