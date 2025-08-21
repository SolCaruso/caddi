"use client"

import { useState, useRef, Suspense, useEffect } from "react"
import Link from "next/link"
import { Upload, AlertCircle, X } from "lucide-react"
import ThreeDModelViewer from "./ThreeDModelViewer"
import { useCart, CartItem } from "@/lib/cart"
import { DrawerDialogDemo } from "@/components/ui/cart-notification"
// import {
//   Alert,
//   AlertDescription,
//   AlertTitle,
// } from "@/components/ui/alert"

interface TextureOption {
  id: string
  name: string
  texture: string
  price: number
  description: string
}

interface BuildYourOwnClientProps {
  modelPath: string
  initialSettings?: {
    wood?: string
    forecaddi?: string
    logoColor?: string
    model?: string
  }
}

export default function BuildYourOwnClient({ modelPath, initialSettings }: BuildYourOwnClientProps) {
  // Add CSS keyframes for fadeIn animation
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])
  // Available texture options
  const textureOptions: TextureOption[] = [
    {
      id: 'canarywood',
      name: 'Canarywood',
      texture: '/textures/canarywood.webp',
      price: 17.99,
      description: 'Rich golden yellow with subtle grain'
    },
    {
      id: 'zebrawood',
      name: 'Zebrawood',
      texture: '/textures/zebrawood.webp',
      price: 21.99,
      description: 'Bold striped pattern with dramatic contrast'
    },
    {
      id: 'white-oak',
      name: 'Quarter-Sawn White Oak',
      texture: '/textures/white-oak.webp',
      price: 15.99,
      description: 'Classic light wood with prominent grain'
    },
    {
      id: 'wenge',
      name: 'Wenge',
      texture: '/textures/wenge.webp',
      price: 19.99,
      description: 'Dark chocolate brown with fine grain'
    },
    // {
    //   id: 'rosewood',
    //   name: ' Bolivian Rosewood',
    //   texture: '/textures/rosewood.webp',
    //   price: 22.99,
    //   description: 'Rich reddish-brown with elegant patterns'
    // },
    // {
    //   id: 'tigerwood',
    //   name: 'Tigerwood',
    //   texture: '/textures/tigerwood.webp',
    //   price: 19.99,
    //   description: 'Orange base with dark streaking stripes'
    // },
    {
      id: 'paduk',
      name: 'Paduk',
      texture: '/textures/paduk.webp',
      price: 17.99,
      description: 'Vibrant orange-red with smooth texture'
    },
    {
      id: 'birds-eye',
      name: 'Birds Eye Maple',
      texture: '/textures/birds-eye.webp',
      price: 15.99,
      description: 'Light wood with distinctive eye patterns'
    },
    // {
    //   id: 'curly-maple',
    //   name: 'Curly Maple',
    //   texture: '/textures/curly-maple.webp',
    //   price: 179,
    //   description: 'Light maple with beautiful curly figure'
    // }
  ]

  // Initialize state based on URL parameters
  const getInitialTexture = () => {
    if (initialSettings?.wood) {
      const found = textureOptions.find(option => 
        option.name.toLowerCase().replace(/\s+/g, '-') === initialSettings.wood?.toLowerCase().replace(/\s+/g, '-')
      )
      return found || textureOptions[0]
    }
    return textureOptions[0]
  }

  const getInitialForecaddiLogo = () => {
    if (initialSettings?.forecaddi) {
      return initialSettings.forecaddi === 'true'
    }
    return true
  }

  const getInitialLogoColor = () => {
    if (initialSettings?.logoColor && ['black', 'white', 'neutral'].includes(initialSettings.logoColor)) {
      return initialSettings.logoColor as 'black' | 'white' | 'neutral'
    }
    return 'neutral'
  }

  const [selectedTexture, setSelectedTexture] = useState<TextureOption>(getInitialTexture())
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [showForecaddiLogo, setShowForecaddiLogo] = useState(getInitialForecaddiLogo())
  const [logoColor, setLogoColor] = useState<'black' | 'white' | 'neutral'>(getInitialLogoColor())
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [showDesktop, setShowDesktop] = useState(false)
  

  

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addItem } = useCart()

  useEffect(() => {
    setShowDesktop(true)
  }, [])

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        setUploadError('Please upload a PNG or WebP file only.')
        return
      }

      // Validate file size (2MB = 2 * 1024 * 1024 bytes)
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        setUploadError('File size must be 2MB or less.')
        return
      }

      // Validate image dimensions
      const img = new Image()
      const url = URL.createObjectURL(file)
      
      img.onload = () => {
        URL.revokeObjectURL(url)
        
        // Check if image is square (aspect ratio 1:1)
        if (img.width !== img.height) {
          setUploadError('Please upload a square image (same width and height).')
          return
        }
        
        // Check if image is 500px or smaller
        if (img.width > 500 || img.height > 500) {
          setUploadError('Please upload an image that is 500px x 500px or smaller.')
          return
        }

        // If all validations pass, set the file
        setLogoFile(file)
        setUploadError(null) // Clear any previous errors
        // Automatically uncheck Forecaddi logo when custom logo is uploaded
        setShowForecaddiLogo(false)
      }

      img.onerror = () => {
        URL.revokeObjectURL(url)
        setUploadError('Unable to read the image file. Please try again.')
      }

      img.src = url
    }
  }

  const handleRemoveLogo = () => {
    setLogoFile(null)
    setUploadError(null)
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAddToBag = () => {
    // Create a hash ID based on the configuration
    const configString = `${selectedTexture.id}-${showForecaddiLogo ? '1' : '0'}-${logoFile ? '1' : '0'}-${logoColor}`
    const configId = Math.abs(configString.split('').reduce((hash, char) => {
      return ((hash << 5) - hash) + char.charCodeAt(0) | 0
    }, 0))
    
    // Create a custom product for the bag
    const customProduct: CartItem = {
      id: configId, // Use hash-based ID for consistent combining
      name: `Custom Divot Tool - ${selectedTexture.name}`,
      price: selectedTexture.price, // Only the base wood price
      image: selectedTexture.texture, // Use the wood texture as the product image
      quantity: 1,
      // Add custom build data
      customBuildData: {
        woodType: selectedTexture.name,
        showForecaddiLogo,
        logoColor,
        customLogoFile: logoFile || undefined,
        modelPath,
        // Logo fees (charged only once regardless of quantity)
        customLogoFee: logoFile ? 25 : undefined,
        forecaddiFee: showForecaddiLogo ? 3.95 : undefined
      }
    }

    addItem(customProduct)
  }

  const totalPrice = Math.round((selectedTexture.price + (logoFile ? 25 : 0) + (showForecaddiLogo ? 3.95 : 0)) * 100) / 100

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
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-600"></div>
            </div>}>
              <ThreeDModelViewer 
                modelPath={modelPath}
                woodTexture={selectedTexture.texture}
                showForecaddiLogo={showForecaddiLogo}
                logoColor={logoColor}
                customLogoFile={logoFile}
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
                      ? "border-caddi-blue text-caddi-blue bg-[#FDFCFC]"
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
          {!logoFile && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="forecaddi-logo"
                    checked={showForecaddiLogo}
                    onChange={(e) => setShowForecaddiLogo(e.target.checked)}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="forecaddi-logo" 
                    className={`w-4 h-4 border-2 rounded-sm cursor-pointer flex items-center justify-center transition-colors ${
                      showForecaddiLogo 
                        ? 'bg-caddi-blue border-caddi-blue' 
                        : 'bg-[#FDFCFC] border-gray-300'
                    }`}
                  >
                    {showForecaddiLogo && (
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>
                </div>
                <label htmlFor="forecaddi-logo" className="text-lg font-semibold text-caddi-blue cursor-pointer">
                  Forecaddi Logo (etched): <span className="text-sm font-normal text-gray-500">(+$3.95)</span>
                </label>
              </div>
            </div>
          )}

          {/* Logo Color Selection */}
          {(showForecaddiLogo || logoFile) && (
            <div className="space-y-3">
              <p className="text-lg font-medium text-caddi-blue">Etched Logo Color:</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setLogoColor('neutral')}
                  className={`px-6 py-3 border rounded-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    logoColor === 'neutral'
                      ? 'border-caddi-blue text-caddi-blue'
                      : 'border-gray-300 text-black/50 hover:border-gray-400'
                  }`}
                >
                  Neutral
                </button>
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
              <div className="relative">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-caddi-blue transition-colors w-full group relative cursor-pointer"
                >
                  <Upload className="w-5 h-5 text-gray-400 group-hover:text-caddi-blue transition-colors" />
                  <span className="text-gray-600 group-hover:text-caddi-blue transition-colors">
                    {logoFile ? (
                      <>
                        <span className="opacity-100 group-hover:opacity-0 transition-all duration-300 ease-in-out-quad absolute">Selected: {logoFile.name}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out-quad">Upload different logo</span>
                      </>
                    ) : "Upload Logo (PNG/WebP, 500x500px max, 2MB)"}
                  </span>
                  {logoFile && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveLogo()
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-sm hover:bg-gray-200 transition-colors cursor-pointer group"
                      title="Remove logo"
                    >
                      <X className="w-4 h-4 text-gray-400 group-hover:text-caddi-blue" />
                    </div>
                  )}
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/webp"
                onChange={handleLogoUpload}
                className="hidden"
              />
              {logoFile && (
                <div className="text-sm text-gray-600">
                  Logo will be laser etched on your divot tool
                </div>
              )}
              
              {/* Upload Error Alert */}
              {uploadError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <h5 className="font-medium text-red-800">Upload Error</h5>
                  </div>
                  <p className="text-sm text-red-700 mt-1">{uploadError}</p>
                </div>
              )}
            </div>
          </div>

          {/* Add to Bag Button with Cart Notification */}
          <DrawerDialogDemo
            productName={`Custom Divot Tool - ${selectedTexture.name}`}
            productPrice={Math.round((selectedTexture.price + (logoFile ? 25 : 0) + (showForecaddiLogo ? 3.95 : 0)) * 100) / 100}
            productImage={selectedTexture.texture}
            onButtonClick={handleAddToBag}
          >
            Add to Bag - ${totalPrice.toFixed(2)}
          </DrawerDialogDemo>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className={`lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start transition-opacity duration-500 ease-in-out ${showDesktop ? 'opacity-100' : 'opacity-0'} hidden lg:block`}>
        {/* Left: 3D Model Viewer */}
        <div className="pr-8 sticky top-8">
          <div className="relative bg-[#D9D9D9]/30 overflow-hidden rounded-lg max-w-[650px] w-full h-[750px]" style={{backgroundColor: '#F3F3F3'}}>
            <Suspense fallback={<div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-600"></div>
            </div>}>
              <ThreeDModelViewer 
                modelPath={modelPath}
                woodTexture={selectedTexture.texture}
                showForecaddiLogo={showForecaddiLogo}
                logoColor={logoColor}
                customLogoFile={logoFile}
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
                      ? "border-caddi-brown/50 text-caddi-blue bg-[#FDFCFC]"
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
          {!logoFile && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="forecaddi-logo-desktop"
                    checked={showForecaddiLogo}
                    onChange={(e) => setShowForecaddiLogo(e.target.checked)}
                    className="sr-only"
                  />
                  <label 
                    htmlFor="forecaddi-logo-desktop" 
                    className={`w-5 h-5 border-2 rounded-sm cursor-pointer flex items-center justify-center transition-colors ${
                      showForecaddiLogo 
                        ? 'bg-caddi-blue border-caddi-blue' 
                        : 'bg-[#FDFCFC] border-gray-300'
                    }`}
                  >
                    {showForecaddiLogo && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>
                </div>
                <label htmlFor="forecaddi-logo-desktop" className="text-xl font-semibold text-caddi-blue cursor-pointer">
                  Forecaddi Logo (etched): <span className="text-base font-normal text-gray-500">(+$3.95)</span>
                </label>
              </div>
            </div>
          )}

          {/* Logo Color Selection */}
          {(showForecaddiLogo || logoFile) && (
            <div className="space-y-3">
              <p className="text-xl font-medium text-caddi-blue">Etched Logo Color:</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setLogoColor('neutral')}
                  className={`px-6 py-3 border rounded-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    logoColor === 'neutral'
                      ? 'border-caddi-blue text-caddi-blue'
                      : 'border-gray-300 text-black/50 hover:border-gray-400'
                  }`}
                >
                  Neutral
                </button>
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
              <div className="relative">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-4 px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-caddi-blue transition-colors w-full group relative cursor-pointer"
                >
                  <Upload className="w-6 h-6 text-gray-400 group-hover:text-caddi-blue transition-colors" />
                  <span className="text-gray-600 text-lg group-hover:text-caddi-blue transition-colors">
                    {logoFile ? (
                      <>
                        <span className="opacity-100 group-hover:opacity-0 transition-all duration-300 absolute">Selected: {logoFile.name}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300">Upload different logo</span>
                      </>
                    ) : "Upload Logo (PNG/WebP, 500x500px max, 2MB)"}
                  </span>
                  {logoFile && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveLogo()
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-sm hover:bg-gray-100 transition-colors cursor-pointer group"
                      title="Remove logo"
                    >
                      <X className="w-5 h-5 text-gray-400 group-hover:text-caddi-blue" />
                    </div>
                  )}
                </button>
              </div>
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
              
              {/* Upload Error Alert */}
              {uploadError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <h5 className="font-medium text-red-800">Upload Error</h5>
                  </div>
                  <p className="text-sm text-red-700 mt-1">{uploadError}</p>
                </div>
              )}
            </div>
          </div>

          {/* Add to Bag Button with Cart Notification */}
          <DrawerDialogDemo
            productName={`Custom Divot Tool - ${selectedTexture.name}`}
            productPrice={Math.round((selectedTexture.price + (logoFile ? 25 : 0) + (showForecaddiLogo ? 3.95 : 0)) * 100) / 100}
            productImage={selectedTexture.texture}
            onButtonClick={handleAddToBag}
          >
            Add to Bag - ${totalPrice.toFixed(2)}
          </DrawerDialogDemo>
        </div>
      </div>
    </>
  )
} 