"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, useTexture } from "@react-three/drei"
import { Suspense, useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'

interface ModelProps {
  modelPath: string
  woodTexture: string
  logoTexture?: string
}

// Custom OBJ+MTL Model Component with manual rotation
function ObjModel({ modelPath, woodTexture, logoTexture }: ModelProps) {
  const [model, setModel] = useState<THREE.Group | null>(null)
  const [error, setError] = useState<string | null>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [lastMouseX, setLastMouseX] = useState(0)

  // Load texture
  const woodMap = useTexture(woodTexture)
  const { gl } = useThree()

  // Handle mouse events for manual rotation
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setIsDragging(true)
      setLastMouseX(event.clientX)
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return
      
      const deltaX = event.clientX - lastMouseX
      setRotation(prev => prev + deltaX * 0.01) // Adjust sensitivity
      setLastMouseX(event.clientX)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    const canvas = gl.domElement
    canvas.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, lastMouseX, gl])

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log("🔄 Loading OBJ+MTL:", modelPath)
        
        // Load MTL first
        const mtlLoader = new MTLLoader()
        const mtlPath = modelPath.replace('.obj', '.mtl')
        const materials = await mtlLoader.loadAsync(mtlPath)
        materials.preload()
        
        // Load OBJ with materials
        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)
        const object = await objLoader.loadAsync(modelPath)
        
        console.log("✅ OBJ+MTL loaded successfully")
        setModel(object)
        setError(null)
      } catch (err) {
        console.error("❌ Failed to load OBJ+MTL:", err)
        // Fallback: try loading just the OBJ without MTL
        try {
          console.log("🔄 Fallback: Loading OBJ without MTL")
          const objLoader = new OBJLoader()
          const object = await objLoader.loadAsync(modelPath)
          console.log("✅ OBJ loaded successfully (no MTL)")
          setModel(object)
          setError(null)
        } catch (objErr) {
          console.error("❌ Failed to load OBJ:", objErr)
          setError("Failed to load model")
        }
      }
    }

    loadModel()
  }, [modelPath])

  // Apply wood texture when model and texture are loaded
  useEffect(() => {
    if (!model || !woodMap) return

    console.log("🎨 Applying wood texture to OBJ model")
    
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        console.log("🎨 Found mesh:", child.name || "unnamed")
        
        // Determine wood color based on texture path
        let woodColor = 0x8B4513 // Default brown
        if (woodTexture.includes('birds-eye-maple')) {
          woodColor = 0xD2B48C // Light maple
        } else if (woodTexture.includes('cherry')) {
          woodColor = 0xA0522D // Cherry brown
        } else if (woodTexture.includes('walnut')) {
          woodColor = 0x3C2415 // Dark walnut
        }
        
        // Try both texture and color - one should work
        const material = new THREE.MeshStandardMaterial({
          map: woodMap, // Try texture first
          color: woodColor, // Fallback color that blends with texture
          roughness: 0.8,
          metalness: 0.1,
        })
        
        child.material = material
        console.log("✅ Applied wood material with texture and color fallback")
      }
    })
  }, [model, woodMap, woodTexture])

  // Update rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation
    }
  })

  if (error || !model) {
    return null // No fallback, just return nothing
  }

  return (
    <group ref={groupRef}>
      <primitive 
        object={model} 
        scale={[0.4, 0.4, 0.4]} 
        position={[0, 0, 0]} 
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

function DivotToolModel({ modelPath, woodTexture, logoTexture }: ModelProps) {
  // Only try OBJ, no fallback
  if (modelPath.endsWith('.obj')) {
    return (
      <Suspense fallback={null}>
        <ObjModel 
          modelPath={modelPath} 
          woodTexture={woodTexture} 
          logoTexture={logoTexture} 
        />
      </Suspense>
    )
  }
  
  // No fallback
  return null
}

interface ThreeDModelViewerProps {
  modelPath: string
  woodTexture: string
  logoTexture?: string | null
}

export default function ThreeDModelViewer({ modelPath, woodTexture, logoTexture }: ThreeDModelViewerProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        style={{ background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Suspense fallback={null}>
          {/* 3D Model */}
          <DivotToolModel 
            modelPath={modelPath} 
            woodTexture={woodTexture} 
            logoTexture={logoTexture || undefined} 
          />
        </Suspense>
        
        <Environment preset="studio" />
      </Canvas>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-sm text-gray-500">
        Click and drag to rotate
      </div>
    </div>
  )
}

// Preload the GLTF model
// useGLTF.preload("/glb/divot-tool.glb") 