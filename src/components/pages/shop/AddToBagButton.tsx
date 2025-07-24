"use client"

import { useCart, CartProvider } from "@/lib/cart"
import { ProductVariant } from "@/lib/data"

interface AddToBagButtonProps {
  productId: number
  productName: string
  productPrice: number
  productImage: string
  // Optional props for variant handling
  variants?: ProductVariant[]
  selectedColor?: string | null
  selectedSize?: string | null
  hasVariants?: boolean
  // Optional props for direct variant info
  variantId?: number
  color?: string
  size?: string
  disabled?: boolean
  children: React.ReactNode
}

function AddToBagButtonInner({
  productId,
  productName,
  productPrice,
  productImage,
  variants,
  selectedColor,
  selectedSize,
  hasVariants = false,
  variantId,
  color,
  size,
  disabled = false,
  children
}: AddToBagButtonProps) {
  const { addItem } = useCart()

  const handleAddToBag = () => {
    if (hasVariants && selectedColor && selectedSize && variants) {
      // Handle products with variants that need color/size selection
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
    } else if (variantId && (color || size)) {
      // Handle products with direct variant info
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
    } else {
      // Handle simple products without variants
      addItem({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
        image: productImage
      })
    }
  }

  // Determine if button should be disabled
  const isDisabled = disabled || (hasVariants && (!selectedColor || !selectedSize))

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

export default function AddToBagButton(props: AddToBagButtonProps) {
  return (
    <CartProvider>
      <AddToBagButtonInner {...props} />
    </CartProvider>
  );
} 