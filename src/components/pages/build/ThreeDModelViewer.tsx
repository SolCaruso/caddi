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
  // map incoming key to actual texture file
  const textureMap: Record<string, string> = {
    'material1': '/textures/zebrawood.webp',
    'material2': '/textures/curly-maple.webp',
  }
  const textureURL = textureMap[woodTexture] || textureMap.material1
  // load and configure the wood texture override
  const woodMap = useTexture(textureURL)
  woodMap.wrapS = woodMap.wrapT = THREE.ClampToEdgeWrapping
  woodMap.repeat.set(1, 1)

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

      // override each mesh's diffuse map with our woodMap
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.map = woodMap
          child.material.needsUpdate = true
        }
      })
      setModel(object)
    }
    loadModel()
  }, [modelPath])

  // Use the original MTL materials - don't override them
  useEffect(() => {
    if (!model) return

    console.log("🎨 Using original MTL materials from OBJ export")
    
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        console.log("🎨 Found mesh with material:", child.name || "unnamed", child.material)
        // Don't modify the material - use exactly what came from MTL file
        console.log("✅ Keeping original MTL material")
      }
    })
  }, [model])

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