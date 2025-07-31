"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { loadStripe } from "@stripe/stripe-js"
import { useCart } from "@/lib/cart"
import { CheckCircle, X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface DrawerDialogDemoProps {
  productId: number
  productName: string
  productPrice: number
  productImage: string
  selectedColor?: string | null
  selectedSize?: string | null
  disabled?: boolean
  children: React.ReactNode
  onButtonClick?: () => void
}

export function DrawerDialogDemo({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productId,
  productName,
  productPrice,
  productImage,
  selectedColor,
  selectedSize,
  disabled = false,
  children,
  onButtonClick
}: DrawerDialogDemoProps) {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { state } = useCart()

  // Initialize Stripe
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

  const handleButtonClick = () => {
    onButtonClick?.() // Call the callback first (adds to cart)
    setOpen(true) // Then open the notification
    
    // Smooth scroll to top only for desktop (dialog), not mobile (drawer)
    if (isDesktop) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Auto-close dialog after 6 seconds (unless loading)
  React.useEffect(() => {
    if (open && !isLoading) {
      const timer = setTimeout(() => {
        setOpen(false)
      }, 6000) // 6 seconds

      return () => clearTimeout(timer) // Cleanup timer on unmount or when open changes
    }
  }, [open, isLoading])

  const handleCheckout = async () => {
    if (state.items.length === 0) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: state.items,
        }),
      })

      const { sessionId } = await response.json()
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        })
        
        if (error) {
          setIsLoading(false)
        }
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            disabled={disabled} 
            onClick={handleButtonClick}
            className="bg-white text-lg border border-caddi-blue text-caddi-black font-medium py-8 px-38 rounded-full hover:bg-caddi-blue hover:text-white transition-all duration-100 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full"
          >
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent 
          showCloseButton={false}
          overlayClassName="z-[5]"
          className="w-80 max-w-none p-0 pt-6 border-0 shadow-lg bg-white rounded-b-xl overflow-hidden animate-in slide-in-from-top-2 fade-in-0 z-[60]"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Added to Bag</DialogTitle>
            <DialogDescription>Product successfully added to your shopping bag</DialogDescription>
          </DialogHeader>
          
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 z-10 p-2.5 mt-5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 p-4 pb-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium text-gray-900">Added to Bag</span>
          </div>

          {/* Product info */}
          <div className="flex gap-3 px-4 pt-2 pb-5">
            <div className="w-20 h-20 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
              <Image
                src={productImage}
                alt={productName}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm leading-tight">
                {productName}
              </h3>
              {selectedColor && (
                <p className="text-xs text-gray-600 mt-1">
                  {selectedColor}
                </p>
              )}
              {selectedSize && (
                <p className="text-xs text-gray-600">
                  Size {selectedSize}
                </p>
              )}
              <p className="text-sm font-medium text-gray-900 mt-1">
                ${productPrice}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 p-4 pt-0">
            <Link
              href="/cart"
              className="w-full bg-gray-100 text-gray-900 text-center py-3 px-4 rounded-full font-medium hover:bg-gray-200 transition-colors"
              onClick={() => setOpen(false)}
            >
              View Bag
            </Link>
            <button
              className="w-full bg-caddi-blue text-white text-center py-3 px-4 rounded-full font-medium hover:bg-caddi-blue/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCheckout}
              disabled={isLoading || state.items.length === 0}
            >
              {isLoading ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button 
          disabled={disabled} 
          onClick={handleButtonClick}
          className="bg-white text-lg border border-caddi-blue text-caddi-black font-medium py-8 px-38 rounded-full hover:bg-caddi-blue hover:text-white transition-all duration-100 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {children}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Added to Bag
          </DrawerTitle>
        </DrawerHeader>
        
        {/* Product info */}
        <div className="flex gap-3 px-4 pb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={productImage}
              alt={productName}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-sm leading-tight">
              {productName}
            </h3>
            {selectedColor && (
              <p className="text-xs text-gray-600 mt-1">
                {selectedColor}
              </p>
            )}
            {selectedSize && (
              <p className="text-xs text-gray-600">
                Size {selectedSize}
              </p>
            )}
            <p className="text-sm font-medium text-gray-900 mt-1">
              ${productPrice}
            </p>
          </div>
        </div>

        <DrawerFooter className="pt-2">
          <Link
            href="/cart"
            className="w-full bg-gray-100 text-gray-900 text-center py-3 px-4 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            View Bag
          </Link>
          <button
            className="w-full bg-caddi-blue text-white text-center py-3 px-4 rounded-full font-medium hover:bg-caddi-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleCheckout}
            disabled={isLoading || state.items.length === 0}
          >
            {isLoading ? 'Processing...' : 'Checkout'}
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

