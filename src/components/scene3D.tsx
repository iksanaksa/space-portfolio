import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Starfield from './Starfield'
import Sun from './Sun'

export default function Scene3D() {
  return (
    <div style={{ width: '100%', height: '500px', marginTop: '40px' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#05070f']} />

        <ambientLight intensity={0.08} />

        <Starfield count={3000} />
        <Sun radius={1.2} />

        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={15}
          enableDamping
        />
      </Canvas>
    </div>
  )
}