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
  showForecaddiLogo?: boolean
  logoColor?: 'black' | 'white' | 'neutral'
  customLogoFile?: File | null
}

// Texture preloader component
function TexturePreloader() {
  const textureLoader = new THREE.TextureLoader()
  
  // All available wood textures
  const texturePaths = [
    '/textures/canarywood.webp',
    '/textures/zebrawood.webp',
    '/textures/white-oak.webp',
    '/textures/wenge.webp',
    '/textures/rosewood.webp',
    '/textures/tigerwood.webp',
    '/textures/paduk.webp',
    '/textures/birds-eye.webp',
    '/textures/curly-maple.webp'
  ]

  useEffect(() => {
    // Preload all textures
    texturePaths.forEach(path => {
      textureLoader.load(
        path,
        (texture) => {
          // Configure texture properties
          texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
          texture.repeat.set(1, 1)
          texture.colorSpace = THREE.SRGBColorSpace
          texture.flipY = false
          // Store in cache using a custom cache object
          if (!(window as any).textureCache) {
            (window as any).textureCache = new Map()
          }
          (window as any).textureCache.set(path, texture)
        },
        undefined,
        (error) => {
          console.warn(`Failed to preload texture: ${path}`, error)
        }
      )
    })
  }, [])

  return null
}

// Custom OBJ+MTL Model Component with manual rotation
function ObjModel({ modelPath, woodTexture, showForecaddiLogo = false, logoColor = 'neutral', customLogoFile = null }: ModelProps) {
  const textureLoader = new THREE.TextureLoader()
  const [woodMap, setWoodMap] = useState<THREE.Texture | null>(null)

  // Load texture from cache or load if not cached
  useEffect(() => {
    const loadTexture = () => {
      // Check if texture is already cached
      const cachedTexture = (window as any).textureCache?.get(woodTexture)
      if (cachedTexture) {
        setWoodMap(cachedTexture)
      } else {
        // Load texture if not cached
        textureLoader.load(
          woodTexture,
          (texture) => {
            texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
            texture.repeat.set(1, 1)
            texture.colorSpace = THREE.SRGBColorSpace
            texture.flipY = false
            setWoodMap(texture)
          },
          undefined,
          (error) => {
            console.error('Error loading wood texture:', error)
          }
        )
      }
    }

    loadTexture()
  }, [woodTexture])

  const [model, setModel] = useState<THREE.Group | null>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [lastMouseX, setLastMouseX] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const [isRotating, setIsRotating] = useState(false)

  

  const { gl } = useThree()

  // Handle mouse and touch events for manual rotation
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      setIsDragging(true)
      setLastMouseX(event.clientX)
      
      // For touch events, store initial position
      if (event.pointerType === 'touch') {
        setTouchStartX(event.clientX)
        setTouchStartY(event.clientY)
        setIsRotating(false)
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) return
      
      if (event.pointerType === 'touch') {
        const deltaX = Math.abs(event.clientX - touchStartX)
        const deltaY = Math.abs(event.clientY - touchStartY)
        
        // If horizontal movement is greater than vertical, and we've moved enough, start rotating
        if (deltaX > deltaY && deltaX > 10) {
          setIsRotating(true)
        }
        
        // Only rotate if we've determined this is a rotation gesture
        if (isRotating) {
          const deltaX = event.clientX - lastMouseX
          setRotation(prev => prev + deltaX * 0.01)
          setLastMouseX(event.clientX)
        }
      } else {
        // Mouse events work as before
        const deltaX = event.clientX - lastMouseX
        setRotation(prev => prev + deltaX * 0.01)
        setLastMouseX(event.clientX)
      }
    }

    const handlePointerUp = () => {
      setIsDragging(false)
      setIsRotating(false)
    }

    const canvas = gl.domElement
    canvas.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [isDragging, lastMouseX, touchStartX, touchStartY, isRotating, gl])

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
    if (!model || !woodMap) return

    
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
        

      }
    })
  }, [model, woodMap, woodTexture, showForecaddiLogo])

  // Update rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation
    }
  })

  if (!model) {
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
      {showForecaddiLogo && (
        <ForecaddiLogoOverlay 
          logoColor={logoColor} 
          woodTexture={woodMap || undefined}
          key={`logo-${logoColor}`}
        />
      )}
      
      {/* Custom Logo Overlay */}
      {customLogoFile && (
        <CustomLogoOverlay 
          logoFile={customLogoFile}
          woodTexture={woodMap || undefined}
          logoColor={logoColor}
          key={`custom-logo-${customLogoFile.name}-${customLogoFile.size}-${customLogoFile.lastModified}-${Date.now()}`}
        />
      )}
    </group>
  )
}

function DivotToolModel({ modelPath, woodTexture, showForecaddiLogo = false, logoColor = 'neutral', customLogoFile = null }: ModelProps) {
  // Only try OBJ, no fallback
  if (modelPath.endsWith('.obj')) {
    return (
      <Suspense fallback={null}>
        <ObjModel 
          modelPath={modelPath} 
          woodTexture={woodTexture} 
          showForecaddiLogo={showForecaddiLogo}
          logoColor={logoColor}
          customLogoFile={customLogoFile}
        />
      </Suspense>
    )
  }
  
  // No fallback
  return null
}

function ForecaddiLogoOverlay({ logoColor = 'neutral', woodTexture }: { logoColor?: 'black' | 'white' | 'neutral', woodTexture?: THREE.Texture }) {
  // Load Forecaddi logo texture inside Canvas
  const forecaddiLogoMap = useTexture('/webp/forecaddi-logo.webp')
  
  if (forecaddiLogoMap) {
    forecaddiLogoMap.wrapS = forecaddiLogoMap.wrapT = THREE.ClampToEdgeWrapping
    forecaddiLogoMap.repeat.set(1, 1)
    forecaddiLogoMap.colorSpace = THREE.SRGBColorSpace
    forecaddiLogoMap.flipY = false
  }
  

  
  return (
    <mesh position={[-0.03, 1.1, 0.19]} scale={[1.5, -1.5, 1.5]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent={true}
        opacity={0.8}
        side={THREE.DoubleSide}
        uniforms={{
          map: { value: forecaddiLogoMap },
          woodTexture: { value: woodTexture },
          invert: { value: logoColor === 'white' ? 1.0 : 0.0 },
          neutral: { value: logoColor === 'neutral' ? 1.0 : 0.0 }
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D map;
          uniform sampler2D woodTexture;
          uniform float invert;
          uniform float neutral;
          varying vec2 vUv;
          void main() {
            vec4 texColor = texture2D(map, vUv);
            if (invert > 0.5) {
              gl_FragColor = vec4(1.0 - texColor.rgb, texColor.a);
            } else if (neutral > 0.5) {
              // For neutral, sample the wood texture and darken it for laser etching
              vec4 woodColor = texture2D(woodTexture, vUv);
              gl_FragColor = vec4(woodColor.rgb * 0.7, texColor.a);
            } else {
              gl_FragColor = texColor;
            }
          }
        `}
      />
    </mesh>
  )
}

function CustomLogoOverlay({ logoFile, woodTexture, logoColor = 'neutral' }: { logoFile: File, woodTexture?: THREE.Texture, logoColor?: 'black' | 'white' | 'neutral' }) {
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null)
  
  useEffect(() => {
    // Clear texture when logoFile is null
    if (!logoFile) {
      setLogoTexture(null)
      return
    }
    
    // Create a unique key for this logo file
    const logoKey = `${logoFile.name}-${logoFile.size}-${logoFile.lastModified}`
    
    // Check if we already have this texture cached
    if (!(window as any).customLogoCache) {
      (window as any).customLogoCache = new Map<string, THREE.Texture>()
    }
    
    const customLogoCache = (window as any).customLogoCache as Map<string, THREE.Texture>
    const cachedTexture = customLogoCache.get(logoKey)
    if (cachedTexture) {
      setLogoTexture(cachedTexture)
      return
    }
    
    let url: string | null = null
    let isCancelled = false
    
    try {
      url = URL.createObjectURL(logoFile)
      const textureLoader = new THREE.TextureLoader()
      
      textureLoader.load(
        url,
        (texture) => {
          if (isCancelled) {
            texture.dispose()
            return
          }
          texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping
          texture.repeat.set(1, 1)
          texture.colorSpace = THREE.SRGBColorSpace
          texture.flipY = false
          
          // Cache the texture
          customLogoCache.set(logoKey, texture)
          setLogoTexture(texture)
        },
        undefined,
        (error) => {
          if (!isCancelled) {
            // Only log if it's a real error, not just a cancelled load
            if (error && typeof error === 'object' && 'type' in error) {
              console.warn('Custom logo texture load cancelled or failed:', error)
            }
          }
        }
      )
    } catch (error) {
      console.warn('Error creating blob URL for custom logo:', error)
    }
    
    return () => {
      isCancelled = true
      if (url) {
        URL.revokeObjectURL(url)
      }
    }
  }, [logoFile])
  
  if (!logoTexture) return null
  

  
  return (
    <mesh position={[-0.03, 1.1, 0.19]} scale={[1.5, -1.5, 1.5]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        key={`custom-logo-shader-${logoColor}`}
        transparent={true}
        opacity={0.8}
        side={THREE.DoubleSide}
        uniforms={{
          map: { value: logoTexture },
          woodTexture: { value: woodTexture },
          invert: { value: logoColor === 'white' ? 1.0 : 0.0 },
          neutral: { value: logoColor === 'neutral' ? 1.0 : 0.0 }
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D map;
          uniform sampler2D woodTexture;
          uniform float invert;
          uniform float neutral;
          varying vec2 vUv;
          void main() {
            vec4 texColor = texture2D(map, vUv);
            if (invert > 0.5) {
              gl_FragColor = vec4(1.0 - texColor.rgb, texColor.a);
            } else if (neutral > 0.5) {
              // For neutral, sample the wood texture and darken it for laser etching
              vec4 woodColor = texture2D(woodTexture, vUv);
              gl_FragColor = vec4(woodColor.rgb * 0.7, texColor.a);
            } else {
              gl_FragColor = texColor;
            }
          }
        `}
      />
    </mesh>
  )
}

interface ThreeDModelViewerProps {
  modelPath: string
  woodTexture: string
  showForecaddiLogo?: boolean
  logoColor?: 'black' | 'white' | 'neutral'
  customLogoFile?: File | null
}

export default function ThreeDModelViewer({ modelPath, woodTexture, showForecaddiLogo = false, logoColor = 'neutral', customLogoFile = null }: ThreeDModelViewerProps) {
  const [cursorStyle, setCursorStyle] = useState('cursor-grab')
  const [isRotating, setIsRotating] = useState(false)
  

  
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
        onTouchStart={(e) => {
          // Only prevent default if we detect horizontal movement
          const touch = e.touches[0]
          if (touch) {
            const startX = touch.clientX
            const startY = touch.clientY
            
            const handleTouchMove = (moveEvent: Event) => {
              const touchEvent = moveEvent as TouchEvent
              const moveTouch = touchEvent.touches[0]
              if (moveTouch) {
                const deltaX = Math.abs(moveTouch.clientX - startX)
                const deltaY = Math.abs(moveTouch.clientY - startY)
                
                if (deltaX > deltaY && deltaX > 10) {
                  setIsRotating(true)
                  touchEvent.preventDefault()
                }
              }
            }
            
            const handleTouchEnd = () => {
              setIsRotating(false)
              document.removeEventListener('touchmove', handleTouchMove)
              document.removeEventListener('touchend', handleTouchEnd)
            }
            
            document.addEventListener('touchmove', handleTouchMove)
            document.addEventListener('touchend', handleTouchEnd)
          }
        }}
        onTouchMove={(e) => {
          if (isRotating) {
            e.preventDefault()
          }
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.7} castShadow />
        <directionalLight position={[-8, 6, -3]} intensity={0.4} />
        <directionalLight position={[5, -5, 8]} intensity={0.2} />
        <spotLight position={[0, 15, 0]} angle={0.3} intensity={0.2} />
        
                <Suspense fallback={null}>
          {/* Texture Preloader */}
          <TexturePreloader />
          
          {/* 3D Model */}
          <DivotToolModel 
            modelPath={modelPath} 
            woodTexture={woodTexture} 
            showForecaddiLogo={showForecaddiLogo}
            logoColor={logoColor}
            customLogoFile={customLogoFile}
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