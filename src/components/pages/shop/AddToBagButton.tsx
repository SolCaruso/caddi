"use client"

import { useCart, CartProvider } from "@/lib/cart"
import { ProductVariant } from "@/lib/data"
import { DrawerDialogDemo } from "@/components/ui/cart-notification"
import { useCallback } from "react"

interface AddToBagButtonProps {
  productId: number
  productName: string
  productPrice: number
  productImage: string
  // Optional props for variant handling
  variants?: ProductVariant[]
  selectedColor?: string | null
  selectedSize?: string | null
  selectedType?: string | null
  hasVariants?: boolean
  isDivotTool?: boolean
  // Optional props for direct variant info
  variantId?: number
  color?: string
  size?: string
  type?: string
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
  selectedType,
  hasVariants = false,
  isDivotTool = false,
  variantId,
  color,
  size,
  type,
  disabled = false,
  children
}: AddToBagButtonProps) {
  const { addItem } = useCart()

  const handleAddToBag = useCallback(() => {
    if (hasVariants && isDivotTool && selectedType && variants) {
      // Handle divot tools with type selection
      const selectedVariant = variants.find(v => 
        v.types?.name === selectedType
      )
      
      if (selectedVariant) {
        addItem({
          id: productId,
          name: productName,
          price: productPrice,
          quantity: 1,
          image: productImage,
          variantId: selectedVariant.id,
          type: selectedType
        })
      }
    } else if (hasVariants && !isDivotTool && selectedColor && selectedSize && variants) {
      // Handle clothing with color/size selection
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
    } else if (variantId && (color || size || type)) {
      // Handle products with direct variant info
      addItem({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
        image: productImage,
        variantId,
        color,
        size,
        type
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
  }, [addItem, productId, productName, productPrice, productImage, variants, selectedColor, selectedSize, selectedType, hasVariants, isDivotTool, variantId, color, size, type])

  // Determine if button should be disabled
  const isDisabled = disabled || 
    (hasVariants && isDivotTool && !selectedType) ||
    (hasVariants && !isDivotTool && (!selectedColor || !selectedSize))

  return (
    <DrawerDialogDemo
      productName={productName}
      productPrice={productPrice}
      productImage={productImage}
      selectedColor={selectedColor}
      selectedSize={selectedSize}
      selectedType={selectedType}
      disabled={isDisabled}
      onButtonClick={handleAddToBag}
    >
      {children}
    </DrawerDialogDemo>
  )
}

export default function AddToBagButton(props: AddToBagButtonProps) {
  return (
    <CartProvider>
      <AddToBagButtonInner {...props} />
    </CartProvider>
  )
} 