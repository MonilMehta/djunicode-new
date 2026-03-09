'use client'
import * as THREE from 'three'
import { useRef, useCallback, useState, Suspense } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer, LUT } from '@react-three/postprocessing'
import { LUTCubeLoader } from 'postprocessing'
import { Beam } from './Beam'
import { Rainbow } from './Rainbow'
import { Prism } from './Prism'
import { Flare } from './Flare'
import { Box } from './Box'

export function lerp(object, prop, goal, speed = 0.1) {
    object[prop] = THREE.MathUtils.lerp(object[prop], goal, speed)
}

const vector = new THREE.Vector3()
export function lerpV3(value, goal, speed = 0.1) {
    value.lerp(vector.set(...goal), speed)
}

export function calculateRefractionAngle(incidentAngle, glassIor = 2.5, airIor = 1.000293) {
    const theta = Math.asin((airIor * Math.sin(incidentAngle)) / glassIor) || 0
    return theta
}

// Separate component so useLoader suspends INSIDE the Canvas
function Effects() {
    const texture = useLoader(LUTCubeLoader, '/prism/lut.cube')
    return (
        <EffectComposer disableNormalPass>
            <Bloom mipmapBlur levels={9} intensity={1.5} luminanceThreshold={1} luminanceSmoothing={1} />
            <LUT lut={texture} />
        </EffectComposer>
    )
}

function Scene() {
    const [isPrismHit, hitPrism] = useState(false)
    const flare = useRef(null)
    const ambient = useRef(null)
    const spot = useRef(null)
    const boxreflect = useRef(null)
    const rainbow = useRef(null)

    const rayOut = useCallback(() => hitPrism(false), [])
    const rayOver = useCallback((e) => {
        e.stopPropagation()
        hitPrism(true)
        rainbow.current.material.speed = 1
        rainbow.current.material.emissiveIntensity = 20
    }, [])

    const vec = new THREE.Vector3()
    const rayMove = useCallback(({ api, position, direction, normal }) => {
        if (!normal) return
        vec.toArray(api.positions, api.number++ * 3)
        flare.current.position.set(position.x, position.y, -0.5)
        flare.current.rotation.set(0, 0, -Math.atan2(direction.x, direction.y))

        let angleScreenCenter = Math.atan2(-position.y, -position.x)
        const normalAngle = Math.atan2(normal.y, normal.x)
        const incidentAngle = angleScreenCenter - normalAngle
        const refractionAngle = calculateRefractionAngle(incidentAngle) * 6
        angleScreenCenter += refractionAngle
        rainbow.current.rotation.z = angleScreenCenter

        lerpV3(spot.current.target.position, [Math.cos(angleScreenCenter), Math.sin(angleScreenCenter), 0], 0.05)
        spot.current.target.updateMatrixWorld()
    }, [])

    const hasInteracted = useRef(false)

    useFrame((state) => {
        // Guard: refs may not be ready on very first frame
        if (!boxreflect.current || !rainbow.current || !spot.current || !ambient.current) return

        let targetX, targetY;
        if (!hasInteracted.current) {
            // Set the static default starting position here 
            // Currently set to upper-left: [width / -4, height / 2.5]
            targetX = state.viewport.width / 2;
            targetY = state.viewport.height / 2.5;

            // Trigger the prism effect briefly on load so people know it exists
            const time = state.clock.getElapsedTime();
            if (time > 0.5 && time < 1.0) hitPrism(true)
        } else {
            targetX = (state.pointer.x * state.viewport.width) / 2;
            targetY = (state.pointer.y * state.viewport.height) / 2;
        }

        boxreflect.current.setRay(
            [targetX, targetY, 0],
            [0, 0, 0]
        )
        lerp(rainbow.current.material, 'emissiveIntensity', isPrismHit ? 2.5 : 0, 0.1)
        spot.current.intensity = rainbow.current.material.emissiveIntensity
        lerp(ambient.current, 'intensity', 0, 0.025)
    })

    const handlePointerMove = () => {
        hasInteracted.current = true;
    }

    return (
        <>
            <ambientLight ref={ambient} intensity={0} />
            <pointLight position={[10, -10, 0]} intensity={0.05} />
            <pointLight position={[0, 10, 0]} intensity={0.05} />
            <pointLight position={[-10, 0, 0]} intensity={0.05} />
            <spotLight ref={spot} intensity={1} distance={7} angle={1} penumbra={1} position={[0, 0, 1]} />
            <Beam ref={boxreflect} bounce={10} far={20}>
                <Prism scale={1.0} position={[0, 0.5, 0]} onRayOver={rayOver} onRayOut={rayOut} onRayMove={rayMove} />
                {/* 
                  To reflect maximum light / point back to the prism (located at [0, 0.5, 0]),
                  we angle the mirrors perpendicular to the vector between the mirror and the prism.
                  The prism is roughly at origin.
                  
                  Mirror 1 (Top Left): [-4.4, 5.0, 0]. Vector to origin: [4.4, -4.5]. Angle ~ -45deg
                  Mirror 2 (Bottom Left): [-4.5, -1.5, 0]. Vector to origin: [4.5, 2.0]. Angle ~ 24deg
                  Mirror 3 (Top Right): [3.5, 3.5, 0]. Vector to origin: [-3.5, -3.0]. Angle ~ 40deg
                  Mirror 4 (Bottom Right): [4.0, -2.0, 0]. Vector to origin: [-4.0, 2.5]. Angle ~ -32deg

                  Since the light came from behind, we spin them 180deg (subtract Math.PI).
                */}
                {/* 
                  Arranged to create a multi-bounce path:
                  Light from top-left -> Mirror 1 (near top left) -> Mirror 2 (far bottom left) -> Prism at Origin!
                  Symmetric for the right side.
                */}
                {/* <Box position={[-1, 6, 0]} rotation={[0, 0, 20]} scale={0.8} />
                <Box position={[-5.2, 4.5, 0]} rotation={[0, 0, Math.PI / 4]} scale={0.8} /> */}
                <Box position={[-2.5, 2.5, 0]} rotation={[0, 0, Math.PI / 8]} scale={0.8} />
                <Box position={[-3.6, -2, 0]} rotation={[0, 0, -Math.PI / 5]} scale={0.8} />
                <Box position={[3.5, 4.5, 0]} rotation={[0, 0, -Math.PI / 8]} scale={0.8} />
                <Box position={[3.6, -2.5, 0]} rotation={[0, 0, Math.PI / 6]} scale={0.8} />
            </Beam>
            <Rainbow ref={rainbow} startRadius={0} endRadius={0.5} fade={0} />
            <Flare ref={flare} visible={isPrismHit} renderOrder={10} scale={1.25} streak={[12.5, 20, 1]} />
            <mesh visible={false} onPointerMove={handlePointerMove} position={[0, 0, -1]}>
                <planeGeometry args={[100, 100]} />
            </mesh>
        </>
    )
}

export default function PrismScene() {
    return (
        <Canvas
            orthographic
            gl={{ antialias: false }}
            camera={{ position: [0, 0, 100], zoom: 70 }}
            style={{ width: '100%', height: '100%', touchAction: 'none' }}
            onPointerDown={() => { }} // ensure touch starts capture
            onPointerMove={() => { }} // let useFrame handle the coordinates, just need to prevent default touch scroll
        >
            <color attach="background" args={['black']} />
            <Suspense fallback={null}>
                <Scene />
                <Effects />
            </Suspense>
        </Canvas>
    )
}
