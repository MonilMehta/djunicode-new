'use client'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three-stdlib'

export function Prism({ onRayOver, onRayOut, onRayMove, ...props }) {
    const { nodes } = useLoader(GLTFLoader, '/prism/prism.glb')
    return (
        <group {...props}>
            {/* Invisible low-res hitbox */}
            <mesh visible={false} scale={1.9} rotation={[Math.PI / 2, Math.PI, 0]} onRayOver={onRayOver} onRayOut={onRayOut} onRayMove={onRayMove}>
                <cylinderGeometry args={[1, 1, 1, 3, 1]} />
            </mesh>
            {/* Visible hi-res prism */}
            <mesh position={[0, 0, 0.6]} renderOrder={10} scale={2} dispose={null} geometry={nodes.Cone.geometry}>
                <meshPhysicalMaterial clearcoat={1} clearcoatRoughness={0} transmission={1} thickness={0.9} roughness={0} toneMapped={false} />
            </mesh>
        </group>
    )
}
