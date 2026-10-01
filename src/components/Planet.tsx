import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group, Mesh } from 'three'
import type { PlanetConfig } from '../data/planets'
import { planetVert } from '../shaders/planet.vert.ts'
import { planetFrag } from '../shaders/planet.frag.ts'

export default function Planet({ config }: { config: PlanetConfig }) {
  const orbitRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uColorA: { value: new THREE.Color(config.colorA) },
      uColorB: { value: new THREE.Color(config.colorB) },
      uColorC: { value: new THREE.Color(config.colorC) },
      uSeed: { value: config.seed },
    }),
    [config.colorA, config.colorB, config.colorC, config.seed]
  )

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * config.speed
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * config.spinSpeed
    }
  })

  return (
    <group ref={orbitRef}>
      <mesh ref={meshRef} position={[config.distance, 0, 0]}>
        <sphereGeometry args={[config.radius, 64, 64]} />
        <shaderMaterial
          vertexShader={planetVert}
          fragmentShader={planetFrag}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  )
}