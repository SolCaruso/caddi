"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF, useTexture } from "@react-three/drei"
import { Suspense, useRef, useEffect, useState } from "react"
import * as THREE from "three"

interface ModelProps {
  modelPath: string
  woodTexture: string
  logoTexture?: string | null
}

function DivotToolModel({ modelPath, woodTexture, logoTexture }: ModelProps) {
  const [gltfLoaded, setGltfLoaded] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  
  let gltf: any
  let scene: THREE.Group | undefined
  
  try {
    // Use useGLTF with error handling
    gltf = useGLTF(modelPath, true) // true for draco support
    scene = gltf.scene
    
    if (scene && !gltfLoaded) {
      console.log("✅ Model loaded successfully")
    }
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : String(e)
    console.error("❌ Model loading error:", errorMsg)
    setLoadError(errorMsg)
  }
  
  // Handle GLTF loading state properly
  useEffect(() => {
    if (scene && !gltfLoaded) {
      console.log("🎯 Setting GLTF as loaded")
      setGltfLoaded(true)
    }
  }, [scene, gltfLoaded])
  
  const woodMap = useTexture(woodTexture)
  const logoMap = logoTexture ? useTexture(logoTexture) : null
  const meshRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (scene && gltfLoaded) {
      console.log("🛠️ Processing GLTF scene...")
      try {
        // Clone the scene to avoid modifying the original
        const clonedScene = scene.clone()
        
        // Check model dimensions and auto-scale/center
        const box = new THREE.Box3().setFromObject(clonedScene)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        
        console.log("📦 Model bounding box:", {
          size: size,
          center: center,
          min: box.min,
          max: box.max
        })
        
        // Auto-scale the model to a reasonable size (target height of 4 units)
        const maxDimension = Math.max(size.x, size.y, size.z)
        const targetSize = 4
        const scale = targetSize / maxDimension
        
        console.log("📏 Auto-scaling:", {
          originalSize: maxDimension,
          scale: scale,
          newSize: maxDimension * scale
        })
        
        // Center and scale the model
        clonedScene.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
        clonedScene.scale.setScalar(scale)
        
        // Traverse the model and apply wood texture to materials
        clonedScene.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh && child.material) {
            console.log("🎨 Applying texture to mesh:", child.name)
            // Create a new material with the wood texture
            const material = new THREE.MeshStandardMaterial({
              map: woodMap,
              roughness: 0.8,
              metalness: 0.1,
            })
            
            child.material = material
          }
        })

        if (meshRef.current) {
          // Clear existing children
          meshRef.current.clear()
          meshRef.current.add(clonedScene)
          console.log("🚀 Model added to scene")
        }
      } catch (e) {
        console.warn("Failed to process GLTF model:", e)
      }
    }
  }, [scene, woodMap, logoMap, gltfLoaded])

  // Show error state if loading failed
  if (loadError) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    )
  }

  // Show test box if model has invalid geometry
  if (scene && gltfLoaded) {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    
    // Check if bounding box is invalid (infinite or zero size)
    if (!isFinite(size.x) || !isFinite(size.y) || !isFinite(size.z) || 
        size.x === 0 || size.y === 0 || size.z === 0) {
      console.warn("🚨 Model has invalid geometry - showing test box instead")
      return (
        <mesh>
          <boxGeometry args={[2, 4, 0.5]} />
          <meshStandardMaterial 
            map={woodMap}
            roughness={0.8}
            metalness={0.1}
            color="#8B4513"
          />
        </mesh>
      )
    }
  }

  return (
    <group ref={meshRef} position={[0, 0, 0]} scale={[1, 1, 1]} />
  )
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
          position: [10, 10, 10], 
          fov: 75,
          near: 0.01,
          far: 10000
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight 
            position={[-5, 3, -2]} 
            intensity={0.5}
          />
          <pointLight position={[0, 5, 0]} intensity={0.3} />
          
          {/* Environment for reflections */}
          <Environment preset="studio" />
          
          {/* 3D Model */}
          <DivotToolModel 
            modelPath={modelPath}
            woodTexture={woodTexture}
            logoTexture={logoTexture}
          />
          
          {/* Controls */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={8}
            autoRotate={false}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>
      
      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
        Click and drag to rotate • Scroll to zoom
      </div>
    </div>
  )
}

// Preload the GLTF model
useGLTF.preload("/glb/divot-tool.glb") 