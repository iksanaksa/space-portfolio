import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { sunVert } from '../shaders/sun.vert.ts'
import { sunFrag } from '../shaders/sun.frag.ts'
import { coronaFrag } from '../shaders/corona.frag.ts'
import { useMission } from '../store/useMission'

export default function Sun({ radius = 1 }: { radius?: number }) {
  const coronaRef = useRef<THREE.Mesh>(null)
  const openSun = useMission((s) => s.openSun)

  const surfaceUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorCore: { value: new THREE.Color('#fff3b0') },
      uColorMid: { value: new THREE.Color('#ffb347') },
      uColorEdge: { value: new THREE.Color('#ff5f1f') },
    }),
    []
  )

  const coronaUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#ffb347') },
      uIntensity: { value: 0.85 },
    }),
    []
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    surfaceUniforms.uTime.value = t

    if (coronaRef.current) {
      const s = 1.35 + Math.sin(t * 0.8) * 0.02
      coronaRef.current.scale.setScalar(s)
    }
  })

  return (
    <group
      onClick={(e) => {
        e.stopPropagation()
        openSun()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
      }}
    >
      <mesh>
        <sphereGeometry args={[radius, 96, 96]} />
        <shaderMaterial
          vertexShader={sunVert}
          fragmentShader={sunFrag}
          uniforms={surfaceUniforms}
        />
      </mesh>

      <mesh ref={coronaRef} scale={1.35}>
        <sphereGeometry args={[radius, 48, 48]} />
        <shaderMaterial
          vertexShader={sunVert}
          fragmentShader={coronaFrag}
          uniforms={coronaUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      <pointLight intensity={3} distance={60} color="#ffcc66" />
    </group>
  )
}