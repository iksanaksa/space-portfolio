import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Starfield from './Starfield'
import Sun from './Sun'
import Planet from './Planet'
import { planets } from '../data/planets'

export default function Scene3D() {
  return (
    <div style={{ width: '100%', height: '500px', marginTop: '40px' }}>
      <Canvas camera={{ position: [0, 6, 10], fov: 45 }}>
        <color attach="background" args={['#05070f']} />

        <ambientLight intensity={0.08} />

        <Starfield count={3000} />
        <Sun radius={1.2} />

        {planets.map(p => (
          <Planet key={p.id} config={p} />
        ))}

        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={25}
          enableDamping
        />
      </Canvas>
    </div>
  )
}