"use client"

import { useCart } from "@/lib/cart"
import { ProductVariant } from "@/lib/data"

interface AddToBagVariantButtonProps {
  productId: number
  productName: string
  productPrice: number
  productImage: string
  variants: ProductVariant[]
  selectedColor: string | null
  selectedSize: string | null
  hasVariants: boolean
  children: React.ReactNode
}

export default function AddToBagVariantButton({
  productId,
  productName,
  productPrice,
  productImage,
  variants,
  selectedColor,
  selectedSize,
  hasVariants,
  children
}: AddToBagVariantButtonProps) {
  const { addItem } = useCart()

  const handleAddToBag = () => {
    if (hasVariants && selectedColor && selectedSize) {
      // Find the selected variant
      const selectedVariant = variants.find(v => 
        v.colors?.name === selectedColor && v.sizes?.name === selectedSize
      )
      
      if (selectedVariant) {
        addItem({
          id: productId,
          name: productName,
          price: productPrice,
          quantity: 1,
          image: productImage,
          variantId: selectedVariant.id,
          color: selectedColor,
          size: selectedSize
        })
      }
    } else if (!hasVariants) {
      addItem({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
        image: productImage
      })
    }
  }

  const isDisabled = hasVariants && (!selectedColor || !selectedSize)

  return (
    <button
      onClick={handleAddToBag}
      disabled={isDisabled}
      className="bg-white text-lg border border-caddi-blue text-caddi-black font-medium py-4 px-38 rounded-full hover:bg-caddi-blue hover:text-white transition-all duration-100 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  )
} 