'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'

type PropType = {
  images: string[]
  speed?: number
}

const ContinuousCarousel: React.FC<PropType> = ({ images, speed = 30 }) => {
  // Triple images for seamless loop to prevent jumping
  const tripleImages = [...images, ...images, ...images]

  // Preload all images when component mounts
  useEffect(() => {
    images.forEach((imageSrc) => {
      const img = new window.Image()
      img.src = imageSrc
    })
  }, [images])

  // Function to determine width class based on actual aspect ratio from filename
  const getImageClass = (imagePath: string) => {
    // Extract width and height from filename
    const widthMatch = imagePath.match(/w_(\d+)/)
    const heightMatch = imagePath.match(/h_(\d+)/)
    
    if (widthMatch && heightMatch) {
      const width = parseInt(widthMatch[1])
      const height = parseInt(heightMatch[1])
      const aspectRatio = width / height
      
      // Categorize based on aspect ratio
      if (aspectRatio > 1.8) {
        // Very wide images (like 2320x1153 = 2.0 ratio)
        return 'continuous-carousel__slide continuous-carousel__slide--extra-wide'
      } else if (aspectRatio > 1.3) {
        // Wide images (like 2320x1740 = 1.33 ratio)
        return 'continuous-carousel__slide continuous-carousel__slide--wide'
      }
    }
    
    // Default to vertical/square for tall or unknown images
    return 'continuous-carousel__slide continuous-carousel__slide--vertical'
  }

  return (
    <div className="continuous-carousel">
      <div 
        className="continuous-carousel__track"
        style={{
          animationDuration: `${speed}s`
        }}
      >
        {tripleImages.map((image, index) => {
          const imageClass = getImageClass(image)
          const originalIndex = index % images.length
          return (
            <div key={index} className={imageClass}>
              <Image
                src={image}
                alt={`Custom work example ${originalIndex + 1}`}
                width={800}
                height={1200}
                className="w-full h-full object-cover"
                priority={index < 10} // Priority load for first 10 images
                quality={90}
                loading={index < 10 ? "eager" : "lazy"}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ContinuousCarousel
