import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AsteroidData {
  radius: number
  angle: number
  speed: number
  yOffset: number
}

interface Props {
  count?: number
  innerRadius?: number
  outerRadius?: number
  thickness?: number
}

export default function AsteroidBelt({
  count = 500,
  innerRadius = 5.5,
  outerRadius = 6.5,
  thickness = 0.25,
}: Props) {
  const pointsRef = useRef<THREE.Points>(null)

  const { geometry, asteroids } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const asteroids: AsteroidData[] = []

    for (let i = 0; i < count; i++) {
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius)
      const angle = Math.random() * Math.PI * 2
      const speed = (0.15 + Math.random() * 0.08) * (1 / Math.sqrt(radius / 4))
      const yOffset = (Math.random() - 0.5) * thickness

      asteroids.push({ radius, angle, speed, yOffset })
      positions[i * 3 + 0] = Math.cos(angle) * radius
      positions[i * 3 + 1] = yOffset
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    return { geometry, asteroids }
  }, [count, innerRadius, outerRadius, thickness])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.getElapsedTime()
    const posAttr = pointsRef.current.geometry.attributes.position
    const positions = posAttr.array as Float32Array

    for (let i = 0; i < asteroids.length; i++) {
      const a = asteroids[i]
      const angle = a.angle + t * a.speed
      positions[i * 3 + 0] = Math.cos(angle) * a.radius
      positions[i * 3 + 2] = Math.sin(angle) * a.radius
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.07}
        color="#c9b8a0"
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  )
}