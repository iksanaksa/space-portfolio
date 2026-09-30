import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import type { Mesh } from 'three'
import Starfield from './Starfield'

function Ball() {
  const ref = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5
      ref.current.rotation.x += delta * 0.2
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#815b2c" roughness={0.4} />
    </mesh>
  )
}

export default function Scene3D() {
  return (
    <div style={{ width: '100%', height: '500px', marginTop: '40px' }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <color attach="background" args={['#05070f']} />

        <ambientLight intensity={0.15} />
        <pointLight position={[3, 3, 3]} intensity={3} color="#ffd166" />
        <pointLight position={[-3, -2, 2]} intensity={1.5} color="#5bc0be" />

        <Starfield count={500} />
        <Ball />

        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={12}
          enableDamping
        />
      </Canvas>
    </div>
  )
}