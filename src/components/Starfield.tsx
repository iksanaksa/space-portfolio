import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Points } from 'three'

interface Props {
  count?: number
}

export default function Starfield({ count = 3000 }: Props) {
  const ref = useRef<Points>(null)

  // Hitung posisi bintang sekali saja, bukan tiap frame
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Sebar di bola radius antara 20 dan 120
      const r = 40 + Math.random() * 80
      const theta = Math.random() * Math.PI * 2      // sudut horizontal
      const phi = Math.acos(2 * Math.random() - 1)   // sudut vertikal (uniform)

      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)  // x
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)  // y
      arr[i * 3 + 2] = r * Math.cos(phi)                     // z
    }
    return arr
  }, [count])

  // Rotasi pelan seluruh starfield → ilusi "berputar di ruang"
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.008
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.35}
        color="#f5f0e8"
        sizeAttenuation
        transparent
        opacity={0.85}
      />
    </points>
  )
}