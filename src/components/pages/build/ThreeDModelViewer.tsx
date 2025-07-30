"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF, useTexture, Box, Cylinder } from "@react-three/drei"
import { Suspense, useRef, useEffect, useState } from "react"
import * as THREE from "three"

interface ModelProps {
  modelPath: string
  woodTexture: string
  logoTexture?: string | null
}

// Fallback 3D model when GLTF fails to load
function FallbackDivotTool({ woodTexture, logoTexture }: { woodTexture: string; logoTexture?: string | null }) {
  const woodMap = useTexture(woodTexture)
  
  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {/* Handle */}
      <Cylinder
        args={[0.15, 0.15, 2, 16]}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial 
          map={woodMap} 
          roughness={0.8} 
          metalness={0.1}
        />
      </Cylinder>
      
      {/* Spike tip */}
      <Cylinder
        args={[0.05, 0.15, 0.5, 8]}
        position={[0, -1.25, 0]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color="#C0C0C0" 
          roughness={0.3} 
          metalness={0.8}
        />
      </Cylinder>
      
      {/* Top cap */}
      <Cylinder
        args={[0.18, 0.18, 0.2, 16]}
        position={[0, 1.1, 0]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial 
          map={woodMap} 
          roughness={0.8} 
          metalness={0.1}
        />
      </Cylinder>
      
      {/* Logo overlay if provided */}
      {logoTexture && (
        <Cylinder
          args={[0.16, 0.16, 0.01, 16]}
          position={[0, 0.5, 0]}
          rotation={[0, 0, 0]}
        >
          <meshStandardMaterial 
            map={useTexture(logoTexture)}
            transparent={true}
            opacity={0.9}
          />
        </Cylinder>
      )}
    </group>
  )
}

function DivotToolModel({ modelPath, woodTexture, logoTexture }: ModelProps) {
  const [useGLTFModel, setUseGLTFModel] = useState(true)
  const [gltfLoaded, setGltfLoaded] = useState(false)
  
  let scene: THREE.Group | undefined
  let error: any
  
  try {
    const gltf = useGLTF(modelPath)
    scene = gltf.scene
  } catch (e) {
    error = e
    if (useGLTFModel) {
      setUseGLTFModel(false)
    }
  }
  
  // Handle GLTF loading state properly
  useEffect(() => {
    if (scene && !gltfLoaded) {
      setGltfLoaded(true)
    }
  }, [scene, gltfLoaded])
  
  const woodMap = useTexture(woodTexture)
  const logoMap = logoTexture ? useTexture(logoTexture) : null
  const meshRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (scene && gltfLoaded) {
      try {
        // Clone the scene to avoid modifying the original
        const clonedScene = scene.clone()
        
        // Traverse the model and apply wood texture to materials
        clonedScene.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh && child.material) {
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
        }
      } catch (e) {
        console.warn("Failed to process GLTF model, using fallback:", e)
        setUseGLTFModel(false)
      }
    }
  }, [scene, woodMap, logoMap, gltfLoaded])

  // Use fallback model if GLTF fails
  if (!useGLTFModel || error) {
    return <FallbackDivotTool woodTexture={woodTexture} logoTexture={logoTexture} />
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
          position: [3, 2, 3], 
          fov: 50,
          near: 0.1,
          far: 1000
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
            autoRotate={true}
            autoRotateSpeed={1}
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

// Don't preload the GLTF since it might fail without the binary file 