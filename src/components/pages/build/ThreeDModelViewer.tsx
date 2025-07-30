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
  showForecaddiLogo?: boolean
}

// Custom OBJ+MTL Model Component with manual rotation
function ObjModel({ modelPath, woodTexture, logoTexture, showForecaddiLogo = false }: ModelProps) {
  // Use the woodTexture path directly - no mapping needed
  const woodMap = useTexture(woodTexture)
  woodMap.wrapS = woodMap.wrapT = THREE.ClampToEdgeWrapping
  woodMap.repeat.set(1, 1)
  woodMap.colorSpace = THREE.SRGBColorSpace
  woodMap.flipY = false

  const [model, setModel] = useState<THREE.Group | null>(null)
  const [error, setError] = useState<string | null>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [lastMouseX, setLastMouseX] = useState(0)

  

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
    async function loadModel() {
      const mtlLoader = new MTLLoader()
      const mtlPath = modelPath.replace('.obj', '.mtl')
      const materials = await mtlLoader.loadAsync(mtlPath)
      materials.preload()
  
      // ← clamp here
      for (const matName in materials.materials) {
        const mat = materials.materials[matName] as THREE.MeshPhongMaterial
      
        if (mat.map) {
          mat.map.wrapS = mat.map.wrapT = THREE.ClampToEdgeWrapping
          mat.map.repeat.set(1, 1)
          mat.map.needsUpdate = true
        }
      }
  
      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      const object = await objLoader.loadAsync(modelPath)

      // generate planar UVs from mesh bounding box (X→U, Y→V)
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const geom = child.geometry as THREE.BufferGeometry;
          geom.computeBoundingBox();
          const bbox = geom.boundingBox!;
          const size = new THREE.Vector3();
          bbox.getSize(size);
          const posAttr = geom.attributes.position as THREE.BufferAttribute;
          if (posAttr) {
            const uvs = new Float32Array(posAttr.count * 2);
            for (let i = 0; i < posAttr.count; i++) {
              const x = posAttr.getX(i), y = posAttr.getY(i);
              uvs[2 * i] = size.x ? (x - bbox.min.x) / size.x : 0;
              uvs[2 * i + 1] = size.y ? (y - bbox.min.y) / size.y : 0;
            }
            geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
          }
        }
      });

      setModel(object)
    }
    loadModel()
  }, [modelPath])

  // Apply the selected wood texture whenever it changes
  useEffect(() => {
    if (!model) return

    console.log("🎨 Applying wood texture:", woodTexture, "Forecaddi logo:", showForecaddiLogo)
    
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child as THREE.Mesh
        
        // Create a completely new material to avoid MTL interference
        const newMaterial = new THREE.MeshStandardMaterial({
          map: woodMap,
          roughness: 0.4, // Moderate gloss - polished but not mirror-like
          metalness: 0.08, // Subtle metallic reflection 
          transparent: false,
          opacity: 1.0,
          color: new THREE.Color(1.1, 1.1, 1.1), // Slightly brighter than white but not too much
          toneMapped: false,
          envMapIntensity: 0.5 // Moderate environment reflections
        })
        

        
        // Replace the material entirely
        mesh.material = newMaterial
        
        console.log("✅ Applied new material with texture to mesh:", child.name || "unnamed")
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
      
      {/* Forecaddi Logo Overlay - now inside the rotating group */}
      {showForecaddiLogo && <ForecaddiLogoOverlay />}
    </group>
  )
}

function DivotToolModel({ modelPath, woodTexture, logoTexture, showForecaddiLogo = false }: ModelProps) {
  // Only try OBJ, no fallback
  if (modelPath.endsWith('.obj')) {
    return (
      <Suspense fallback={null}>
        <ObjModel 
          modelPath={modelPath} 
          woodTexture={woodTexture} 
          logoTexture={logoTexture} 
          showForecaddiLogo={showForecaddiLogo}
        />
      </Suspense>
    )
  }
  
  // No fallback
  return null
}

function ForecaddiLogoOverlay() {
  // Load Forecaddi logo texture inside Canvas
  const forecaddiLogoMap = useTexture('/webp/forecaddi-logo.webp')
  
  console.log("🎨 Forecaddi logo texture loaded:", { forecaddiLogoMap: !!forecaddiLogoMap })
  
  if (forecaddiLogoMap) {
    forecaddiLogoMap.wrapS = forecaddiLogoMap.wrapT = THREE.ClampToEdgeWrapping
    forecaddiLogoMap.repeat.set(1, 1)
    forecaddiLogoMap.colorSpace = THREE.SRGBColorSpace
    forecaddiLogoMap.flipY = false
  }
  
  console.log("🎨 Rendering Forecaddi logo overlay")
  
  return (
    <mesh position={[-0.01, 1.1, 0.19]} scale={[1.5, 1.5, 1.5]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color={forecaddiLogoMap ? undefined : "red"}
        map={forecaddiLogoMap}
        transparent={true}
        opacity={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

interface ThreeDModelViewerProps {
  modelPath: string
  woodTexture: string
  logoTexture?: string | null
  showForecaddiLogo?: boolean
}

export default function ThreeDModelViewer({ modelPath, woodTexture, logoTexture, showForecaddiLogo = false }: ThreeDModelViewerProps) {
  const [cursorStyle, setCursorStyle] = useState('cursor-grab')
  
  // Debug logging for props
  useEffect(() => {
    console.log("🎯 ThreeDModelViewer props:", { showForecaddiLogo, logoTexture })
  }, [showForecaddiLogo, logoTexture])
  
  return (
    <div className={`w-full h-full ${cursorStyle}`}>
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        style={{ background: 'rgba(217, 217, 217, 0.3)', borderRadius: '10px' }}
        gl={{ 
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace
        }}
        shadows
        onPointerDown={() => setCursorStyle('cursor-grabbing')}
        onPointerUp={() => setCursorStyle('cursor-grab')}
        onPointerLeave={() => setCursorStyle('cursor-grab')}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.7} castShadow />
        <directionalLight position={[-8, 6, -3]} intensity={0.4} />
        <directionalLight position={[5, -5, 8]} intensity={0.2} />
        <spotLight position={[0, 15, 0]} angle={0.3} intensity={0.2} />
        
                <Suspense fallback={null}>
          {/* 3D Model */}
          <DivotToolModel 
            modelPath={modelPath} 
            woodTexture={woodTexture} 
            logoTexture={logoTexture || undefined}
            showForecaddiLogo={showForecaddiLogo}
          />
        </Suspense>
        
        <Environment preset="warehouse" />
      </Canvas>
      
      {/* Visual Rotation Indicators - Bottom half curved arrows */}
      <div className="absolute bottom-42 left-42 rotate-80 text-gray-300 hidden xl:block pointer-events-none animate-pulse">
        <svg className="w-18 h-18 scale-x-[-1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7" />
        </svg>
      </div>
      <div className="absolute bottom-42 right-42 -rotate-80 text-gray-300 hidden xl:block pointer-events-none animate-pulse">
        <svg className="w-18 h-18 scale-x-[-1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7" />
        </svg>
      </div>
      
      {/* Subtle hint text */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-60 animate-pulse pointer-events-none">
        Drag to rotate
      </div>
    </div>
  )
}

// Preload the GLTF model
// useGLTF.preload("/glb/divot-tool.glb") 