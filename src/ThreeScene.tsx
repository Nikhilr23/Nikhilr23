import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Core() {
  const group = useRef<THREE.Group>(null)
  const ring = useRef<THREE.Mesh>(null)
  useFrame((state, delta) => {
    if (!group.current || !ring.current) return
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.15, 0.025)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -state.pointer.x * 0.12, 0.025)
    ring.current.rotation.x += delta * 0.18
    ring.current.rotation.z -= delta * 0.12
  })
  const nodes: [number, number, number][] = [[2.2,.4,0],[-2,.7,.4],[.2,2.15,-.2],[-.4,-2,.3],[1.45,-1.45,-.3],[-1.5,-1.3,-.1]]
  return <group ref={group}>
    <Float speed={1.2} rotationIntensity={.25} floatIntensity={.5}>
      <mesh>
        <icosahedronGeometry args={[1.25, 3]} />
        <meshPhysicalMaterial color="#caff70" roughness={.22} metalness={.25} transmission={.15} thickness={1.4} emissive="#20300c" emissiveIntensity={.55} />
      </mesh>
      <mesh scale={1.015}>
        <icosahedronGeometry args={[1.25, 2]} />
        <meshBasicMaterial color="#10140d" wireframe transparent opacity={.3} />
      </mesh>
    </Float>
    <mesh ref={ring} rotation={[1.1,.2,.4]}><torusGeometry args={[2.25,.012,8,180]} /><meshBasicMaterial color="#eef0e8" transparent opacity={.42} /></mesh>
    <mesh rotation={[.4,1.1,.2]}><torusGeometry args={[2.65,.006,8,180]} /><meshBasicMaterial color="#78a7ff" transparent opacity={.28} /></mesh>
    {nodes.map((p,i)=><group position={p} key={i}><mesh><sphereGeometry args={[.1,20,20]} /><meshBasicMaterial color={i%2 ? '#eef0e8':'#caff70'} /></mesh><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.22,.008,8,32]} /><meshBasicMaterial color="#eef0e8" transparent opacity={.35}/></mesh></group>)}
  </group>
}

export default function ThreeScene() {
  return <Canvas dpr={[1,1.6]} camera={{position:[0,0,7],fov:42}} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}}>
    <ambientLight intensity={1.2}/><directionalLight position={[4,5,5]} intensity={2.2}/><pointLight position={[-4,-2,3]} color="#78a7ff" intensity={18}/>
    <Core/><Sparkles count={60} scale={[10,8,5]} size={1.2} speed={.18} opacity={.35} color="#eef0e8" />
  </Canvas>
}
