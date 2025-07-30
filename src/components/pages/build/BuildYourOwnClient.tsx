"use client"

import { useState, useRef, Suspense, useEffect } from "react"
import Link from "next/link"
import { Upload } from "lucide-react"
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
      id: 'canarywood',
      name: 'Canarywood',
      texture: '/textures/canarywood.webp',
      price: 169,
      description: 'Rich golden yellow with subtle grain'
    },
    {
      id: 'zebrawood',
      name: 'Zebrawood',
      texture: '/textures/zebrawood.webp',
      price: 189,
      description: 'Bold striped pattern with dramatic contrast'
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
  const [showForecaddiLogo, setShowForecaddiLogo] = useState(false)
  const [logoColor, setLogoColor] = useState<'black' | 'white'>('black')
  
  // Force re-render when logoColor changes
  const logoColorKey = `${logoColor}-${Date.now()}`
  
  // Debug logging for Forecaddi logo state
  useEffect(() => {
    console.log("🔍 Forecaddi logo state changed:", showForecaddiLogo)
  }, [showForecaddiLogo])
  
  // Debug logging for logo color state
  useEffect(() => {
    console.log("🎨 Logo color state changed:", logoColor)
  }, [logoColor])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addItem } = useCart()

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const url = URL.createObjectURL(file)
      setLogoUrl(url)
      // Automatically uncheck Forecaddi logo when custom logo is uploaded
      setShowForecaddiLogo(false)
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

  const totalPrice = selectedTexture.price + (logoFile ? 25 : 0) + (showForecaddiLogo ? 3.95 : 0)

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

            {/* Back Button - Match Shop Page Style */}
            <div className="flex-shrink-0">
              <Link href="/shop" className="flex items-center gap-2 text-black/50 font-medium text-sm border rounded-full px-4 py-1.75 cursor-pointer hover:text-black/70 group">
                <svg className="h-4 w-4 text-black/50 group-hover:text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Shop
              </Link>
            </div>
          </div>
        </div>

        {/* 3D Model Viewer */}
        <div className="mb-8 -mx-4 lg:mx-0">
          <div className="relative aspect-square bg-[#D9D9D9]/30 overflow-hidden w-full lg:rounded-lg" style={{backgroundColor: '#F3F3F3'}}>
            <Suspense fallback={<div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-caddi-blue"></div>
            </div>}>
              <ThreeDModelViewer 
                modelPath={modelPath}
                woodTexture={selectedTexture.texture}
                logoTexture={logoUrl}
                showForecaddiLogo={showForecaddiLogo}
                logoColor={logoColor}
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
                  className={`relative pb-4 rounded-lg border transition-all text-left overflow-hidden cursor-pointer ${
                    selectedTexture.id === texture.id
                      ? "border-caddi-blue text-caddi-blue bg-white"
                      : "border-gray-300 hover:border-gray-400 text-black/50 bg-gray-100"
                  }`}
                  style={{
                    opacity: selectedTexture.id === texture.id ? 1 : 0.8
                  }}
                >
                  {/* Texture Preview */}
                  <div 
                    className="w-full h-20 rounded-t mb-3 bg-cover bg-center"
                    style={{ backgroundImage: `url(${texture.texture})` }}
                  />
                  <div className="font-medium text-lg px-4">
                    {texture.name}
                  </div>
                  <div className="text-base text-gray-500 px-4">
                    ${texture.price}
                  </div>
                </button>
              ))}
            </div>

          </div>

          {/* Forecaddi Logo Option */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id="forecaddi-logo"
                checked={showForecaddiLogo}
                onChange={(e) => setShowForecaddiLogo(e.target.checked)}
                className="w-4 h-4 text-caddi-blue border-gray-300 rounded focus:ring-caddi-blue"
              />
              <label htmlFor="forecaddi-logo" className="text-lg font-semibold text-caddi-blue cursor-pointer">
                Forecaddi Logo (etched): <span className="text-sm font-normal text-gray-500">(+$3.95)</span>
              </label>
            </div>
          </div>

          {/* Logo Color Selection */}
          {(showForecaddiLogo || logoFile) && (
            <div className="space-y-3">
              <p className="text-lg font-medium text-caddi-blue">Etched Logo Color:</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setLogoColor('black')}
                  className={`px-6 py-3 border rounded-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    logoColor === 'black'
                      ? 'border-caddi-blue text-caddi-blue'
                      : 'border-gray-300 text-black/50 hover:border-gray-400'
                  }`}
                >
                  Black
                </button>
                <button
                  onClick={() => setLogoColor('white')}
                  className={`px-6 py-3 border rounded-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    logoColor === 'white'
                      ? 'border-caddi-blue text-caddi-blue'
                      : 'border-gray-300 text-black/50 hover:border-gray-400'
                  }`}
                >
                  White
                </button>
              </div>
            </div>
          )}

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

          {/* Add to Bag Button - Match Shop Page Style */}
          <button
            onClick={handleAddToBag}
            className="bg-white text-lg border border-caddi-blue text-caddi-black font-medium py-4.5 px-38 rounded-full hover:bg-caddi-blue hover:text-white transition-all duration-100 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full"
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
        {/* Left: 3D Model Viewer */}
        <div className="pr-8 sticky top-8">
          <div className="relative bg-[#D9D9D9]/30 overflow-hidden rounded-lg max-w-[650px] w-full h-[750px]" style={{backgroundColor: '#F3F3F3'}}>
            <Suspense fallback={<div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-caddi-blue"></div>
            </div>}>
              <ThreeDModelViewer 
                modelPath={modelPath}
                woodTexture={selectedTexture.texture}
                logoTexture={logoUrl}
                showForecaddiLogo={showForecaddiLogo}
                logoColor={logoColor}
              />
            </Suspense>
          </div>
        </div>

        {/* Right: Product Info and Options */}
        <div className="space-y-8">
          {/* Header */}
          <div>
            {/* Category and Back Button Row */}
            <div className="flex items-center justify-between mb-1">
              <p className="text-lg text-black/50 font-semibold">Custom Divot Tools</p>
              <Link href="/shop" className="inline-flex items-center gap-2 text-black/50 font-medium text-sm border rounded-full px-4 py-1.75 cursor-pointer hover:text-black/70 group">
                <svg className="h-4 w-4 text-black/50 group-hover:text-black/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Shop
              </Link>
            </div>

            {/* Product Title */}
            <h1 className="text-5xl font-semibold text-caddi-blue uppercase font-family-proxima-nova-extra-condensed mb-2">
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
                  className={`relative pb-4 rounded-lg border transition-all text-left overflow-hidden cursor-pointer ${
                    selectedTexture.id === texture.id
                      ? "border-caddi-blue text-caddi-blue bg-white"
                      : "border-gray-300 hover:border-gray-400 text-black/50 bg-gray-100"
                  }`}
                  style={{
                    opacity: selectedTexture.id === texture.id ? 1 : 0.8
                  }}
                >
                  {/* Texture Preview */}
                  <div 
                    className="w-full h-20 rounded-t mb-3 bg-cover bg-center"
                    style={{ backgroundImage: `url(${texture.texture})` }}
                  />
                  <div className="font-medium text-lg px-4">
                    {texture.name}
                  </div>
                  <div className="text-base text-gray-500 px-4">
                    ${texture.price}
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

          {/* Forecaddi Logo Option */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <input
                type="checkbox"
                id="forecaddi-logo-desktop"
                checked={showForecaddiLogo}
                onChange={(e) => setShowForecaddiLogo(e.target.checked)}
                className="w-5 h-5 text-caddi-blue border-gray-300 rounded focus:ring-caddi-blue"
              />
              <label htmlFor="forecaddi-logo-desktop" className="text-xl font-semibold text-caddi-blue cursor-pointer">
                Forecaddi Logo (etched): <span className="text-base font-normal text-gray-500">(+$3.95)</span>
              </label>
            </div>
          </div>

          {/* Logo Color Selection */}
          {(showForecaddiLogo || logoFile) && (
            <div className="space-y-3">
              <p className="text-xl font-medium text-caddi-blue">Etched Logo Color:</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setLogoColor('black')}
                  className={`px-6 py-3 border rounded-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    logoColor === 'black'
                      ? 'border-caddi-blue text-caddi-blue'
                      : 'border-gray-300 text-black/50 hover:border-gray-400'
                  }`}
                >
                  Black
                </button>
                <button
                  onClick={() => setLogoColor('white')}
                  className={`px-6 py-3 border rounded-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    logoColor === 'white'
                      ? 'border-caddi-blue text-caddi-blue'
                      : 'border-gray-300 text-black/50 hover:border-gray-400'
                  }`}
                >
                  White
                </button>
              </div>
            </div>
          )}

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

          {/* Add to Bag Button - Match Shop Page Style */}
          <button
            onClick={handleAddToBag}
            className="bg-white text-lg border border-caddi-blue text-caddi-black font-medium py-4.5 px-38 rounded-full hover:bg-caddi-blue hover:text-white transition-all duration-100 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full"
          >
            Add to Bag - ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </>
  )
} 