"use client"

import { useState, useRef, Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"
import ThreeDModelViewer from "./ThreeDModelViewer"
import { useCart, CartItem } from "@/lib/cart"

interface TextureOption {
  id: string
  name: string
  texture: string
  price: number
  description: string
}

interface BuildYourOwnClientProps {
  modelPath: string
}

export default function BuildYourOwnClient({ modelPath }: BuildYourOwnClientProps) {
  // Available texture options
  const textureOptions: TextureOption[] = [
    {
      id: 'zebrawood',
      name: 'Zebrawood',
      texture: '/textures/zebrawood.webp',
      price: 189,
      description: 'Bold striped pattern with dramatic contrast'
    },
    {
      id: 'canarywood',
      name: 'Canarywood',
      texture: '/textures/canarywood.webp',
      price: 169,
      description: 'Rich golden yellow with subtle grain'
    },
    {
      id: 'white-oak',
      name: 'White Oak',
      texture: '/textures/white-oak.webp',
      price: 149,
      description: 'Classic light wood with prominent grain'
    },
    {
      id: 'wenge',
      name: 'Wenge',
      texture: '/textures/wenge.webp',
      price: 199,
      description: 'Dark chocolate brown with fine grain'
    },
    {
      id: 'rosewood',
      name: 'Rosewood',
      texture: '/textures/rosewood.webp',
      price: 179,
      description: 'Rich reddish-brown with elegant patterns'
    },
    {
      id: 'tigerwood',
      name: 'Tigerwood',
      texture: '/textures/tigerwood.webp',
      price: 189,
      description: 'Orange base with dark streaking stripes'
    },
    {
      id: 'paduk',
      name: 'Paduk',
      texture: '/textures/paduk.webp',
      price: 159,
      description: 'Vibrant orange-red with smooth texture'
    },
    {
      id: 'birds-eye',
      name: 'Birds Eye Maple',
      texture: '/textures/birds-eye.webp',
      price: 199,
      description: 'Light wood with distinctive eye patterns'
    },
    {
      id: 'curly-maple',
      name: 'Curly Maple',
      texture: '/textures/curly-maple.webp',
      price: 179,
      description: 'Light maple with beautiful curly figure'
    }
  ]

  const [selectedTexture, setSelectedTexture] = useState<TextureOption>(textureOptions[0])
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addItem } = useCart()

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const url = URL.createObjectURL(file)
      setLogoUrl(url)
    }
  }

  const handleAddToBag = () => {
    // Create a custom product for the bag
    const customProduct: CartItem = {
      id: Date.now(), // Use timestamp as unique number ID
      name: `Custom Divot Tool - ${selectedTexture.name}`,
      price: selectedTexture.price + (logoFile ? 25 : 0), // Add $25 for custom logo
      image: "/webp/placeholder.webp", // You might want to generate a preview image
      quantity: 1,
      // Add customization data as additional properties (not part of CartItem interface but will be preserved)
      ...(logoFile && { customization: {
        woodType: selectedTexture.name,
        hasLogo: !!logoFile,
        logoFile: logoFile?.name
      }})
    }

    addItem(customProduct)
  }

  const totalPrice = selectedTexture.price + (logoFile ? 25 : 0)

  return (
    <>
      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden">
        {/* Product Info at Top */}
        <div className="mb-8">
          {/* Category */}
          <p className="text-lg text-black/50 font-semibold">Custom Divot Tools</p>

          {/* Product Title and Back Button Row */}
          <div className="flex items-end justify-between gap-4">
            <div>
              {/* Product Title */}
              <h1 className="text-4xl font-semibold text-caddi-blue uppercase font-family-proxima-nova-extra-condensed">
                Build Your Own
              </h1>

              {/* Price */}
              <p className="text-xl font-medium text-black/50">
                ${totalPrice.toFixed(2)}
              </p>
            </div>

            {/* Back Button */}
            <Link 
              href="/shop" 
              className="flex items-center gap-2 text-black/50 font-medium text-lg hover:text-caddi-blue transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Shop
            </Link>
          </div>
        </div>

        {/* 3D Model Viewer */}
        <div className="w-full mb-8 -mx-4 lg:mx-0">
          <div className="relative w-full h-[400px] bg-gray-50">
            <Suspense fallback={<div className="flex items-center justify-center h-full text-gray-500">Loading 3D Model...</div>}>
              <ThreeDModelViewer 
                modelPath={modelPath}
                woodTexture={selectedTexture.texture}
                logoTexture={logoUrl}
              />
            </Suspense>
          </div>
        </div>

        {/* Customization Options */}
        <div className="space-y-8">
          {/* Wood Texture Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-caddi-blue">Wood Type:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {textureOptions.map((texture) => (
                <button
                  key={texture.id}
                  onClick={() => setSelectedTexture(texture)}
                  className={`relative p-3 rounded-lg border-2 transition-all text-left overflow-hidden ${
                    selectedTexture.id === texture.id
                      ? "border-caddi-blue bg-caddi-blue/5 text-caddi-blue"
                      : "border-gray-300 hover:border-caddi-blue/50"
                  }`}
                >
                  {/* Texture Preview */}
                  <div 
                    className="w-full h-16 rounded mb-2 bg-cover bg-center"
                    style={{ backgroundImage: `url(${texture.texture})` }}
                  />
                  <div className="font-medium text-sm whitespace-nowrap">
                    {texture.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    ${texture.price}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">{selectedTexture.description}</p>
          </div>

          {/* Logo Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-caddi-blue">Custom Logo: <span className="text-sm font-normal text-gray-500">(+$25)</span></h3>
            <div className="space-y-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-caddi-blue/50 transition-colors w-full"
              >
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">
                  {logoFile ? `Selected: ${logoFile.name}` : "Upload Logo (PNG, JPG, SVG)"}
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              {logoFile && (
                <div className="text-sm text-gray-600">
                  Logo will be laser etched on your divot tool
                </div>
              )}
            </div>
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToBag}
            className="w-full bg-caddi-blue text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-caddi-blue/90 transition-colors"
          >
            Add to Bag - ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
        {/* Left: 3D Model Viewer */}
        <div className="sticky top-8">
          <div className="relative w-full h-[600px] bg-gray-50 rounded-lg">
            <Suspense fallback={<div className="flex items-center justify-center h-full text-gray-500">Loading 3D Model...</div>}>
              <ThreeDModelViewer 
                modelPath={modelPath}
                woodTexture={selectedTexture.texture}
                logoTexture={logoUrl}
              />
            </Suspense>
          </div>
        </div>

        {/* Right: Product Info and Options */}
        <div className="space-y-8">
          {/* Header */}
          <div>
            {/* Back Button */}
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 text-black/50 font-medium text-lg hover:text-caddi-blue transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Shop
            </Link>

            {/* Category */}
            <p className="text-lg text-black/50 font-semibold mb-2">Custom Divot Tools</p>

            {/* Product Title */}
            <h1 className="text-5xl font-semibold text-caddi-blue uppercase font-family-proxima-nova-extra-condensed mb-4">
              Build Your Own
            </h1>

            {/* Price */}
            <p className="text-2xl font-medium text-black/50">
              ${totalPrice.toFixed(2)}
            </p>
          </div>

          {/* Wood Texture Selection */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-caddi-blue">Wood Type:</h3>
            <div className="grid grid-cols-2 gap-4">
              {textureOptions.map((texture) => (
                <button
                  key={texture.id}
                  onClick={() => setSelectedTexture(texture)}
                  className={`relative p-4 rounded-lg border-2 transition-all text-left overflow-hidden ${
                    selectedTexture.id === texture.id
                      ? "border-caddi-blue bg-caddi-blue/5 text-caddi-blue"
                      : "border-gray-300 hover:border-caddi-blue/50"
                  }`}
                >
                  {/* Texture Preview */}
                  <div 
                    className="w-full h-20 rounded mb-3 bg-cover bg-center"
                    style={{ backgroundImage: `url(${texture.texture})` }}
                  />
                  <div className="font-medium text-lg">
                    {texture.name}
                  </div>
                  <div className="text-base text-gray-500 mb-2">
                    ${texture.price}
                  </div>
                  <div className="text-sm text-gray-600">
                    {texture.description}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-lg text-caddi-blue mb-2">
                Selected: {selectedTexture.name}
              </div>
              <div className="text-sm text-gray-600">
                {selectedTexture.description}
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-caddi-blue">Custom Logo: <span className="text-base font-normal text-gray-500">(+$25)</span></h3>
            <div className="space-y-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-4 px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-caddi-blue/50 transition-colors w-full"
              >
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-gray-600 text-lg">
                  {logoFile ? `Selected: ${logoFile.name}` : "Upload Logo (PNG, JPG, SVG)"}
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              {logoFile && (
                <div className="text-base text-gray-600">
                  Logo will be laser etched on your divot tool
                </div>
              )}
            </div>
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToBag}
            className="w-full bg-caddi-blue text-white py-4 px-8 rounded-lg font-medium text-xl hover:bg-caddi-blue/90 transition-colors"
          >
            Add to Bag - ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </>
  )
} 