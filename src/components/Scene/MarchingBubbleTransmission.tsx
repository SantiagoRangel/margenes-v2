import { Instance, Instances } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { MathUtils, SphereGeometry, Texture, TextureLoader } from 'three'

const particles = Array.from({ length: 15 }, () => ({
	factor: MathUtils.randInt(20, 100),
	speed: MathUtils.randFloat(0.01, 1),
	xFactor: MathUtils.randFloatSpread(100),
	yFactor: MathUtils.randFloatSpread(70),
	zFactor: MathUtils.randFloatSpread(40),
}))

export default function MarchingBubblesTransmission() {
	return (
		<>
			<Bubbles />
		</>
	)
}

function Bubbles() {
	const ref = useRef<any>(null!)
	const {
		transmission,
		attenuationColor,
		clearcoat,
		clearcoatRoughness,
		ior,
		reflectivity,
		sheen,
		sheenRoughness,
		specularIntensity,
		specularColor,
		sheenColor,
		thickness,
		metalness,
		roughness,
		depthWrite,
	} = useControls('bubbles', {
		transmission: {
			value: 1.01,
			min: 0,
			max: 5,
			step: 0.01,
		},
		metalness: {
			value: 0,
			min: 0,
			max: 1,
			step: 0.01,
		},
		roughness: {
			value: 0.38,
			min: 0,
			max: 1,
			step: 0.01,
		},
		attenuationColor: {
			value: '#ffffff',
		},
		clearcoat: {
			value: 0.3,
			min: 0,
			max: 1,
			step: 0.1,
		},
		clearcoatRoughness: {
			value: 0.4,
			min: 0,
			max: 1,
			step: 0.1,
		},
		ior: {
			value: 1.4,
			min: 0,
			max: 10,
			step: 0.1,
		},
		reflectivity: {
			value: 1.0,
			min: 0,
			max: 1,
			step: 0.1,
		},
		sheen: {
			value: 0,
			min: 0,
			max: 1,
			step: 0.1,
		},
		sheenRoughness: {
			value: 1,
			min: 0,
			max: 1,
			step: 0.1,
		},
		sheenColor: {
			value: '#ffffff',
		},
		specularIntensity: {
			value: 0.5,
			min: 0,
			max: 1,
			step: 0.1,
		},
		specularColor: {
			value: '#00084e',
		},
		thickness: {
			value: 18,
			min: 0,
			max: 70,
			step: 0.1,
		},
		envMapIntensity: {
			value: 1,
			min: 0,
			max: 20,
			step: 0.1,
		},
		depthWrite: {
			value: true,
		},
	})
	useFrame((state, delta) => {
		if (ref.current) {
			ref.current.rotation.y = MathUtils.damp(ref.current.rotation.y, (-state.mouse.x * Math.PI) / 6, 2.75, delta)
			ref.current.rotation.x = MathUtils.damp(ref.current.rotation.x, (-state.mouse.y * Math.PI) / 6, 2.75, delta)
		}
	})

	return (
		<Instances limit={particles.length} ref={ref} position={[0, 10, -30]}>
			<sphereGeometry />
			<meshPhysicalMaterial
				transmission={transmission}
				clearcoat={clearcoat}
				clearcoatRoughness={clearcoatRoughness}
				ior={ior}
				reflectivity={reflectivity}
				sheen={sheen}
				sheenRoughness={sheenRoughness}
				specularIntensity={specularIntensity}
				specularColor={specularColor}
				thickness={thickness}
				metalness={metalness}
				roughness={roughness}
				attenuationColor={attenuationColor}
				depthWrite={depthWrite}
			/>

			{particles.map((data, i) => (
				<Bubble key={i} {...data}></Bubble>
			))}
		</Instances>
	)
}
interface Parameters {
	factor: number
	speed: number
	xFactor: number
	yFactor: number
	zFactor: number
}
function Bubble({ factor, speed, xFactor, yFactor, zFactor }: Parameters) {
	const ref = useRef<any>(null!)
	useFrame((state) => {
		const t = factor + state.clock.elapsedTime * (speed / 12)
		ref.current.scale.setScalar(Math.max(5, Math.cos(t) * 5))
		ref.current.position.set(
			Math.cos(t) + Math.sin(t * 1) / 10 + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
			Math.sin(t) +
				Math.cos(t * 2) / 10 +
				yFactor +
				Math.sin((t / 10) * factor) +
				(Math.cos(t * 2) * factor) / 10 -
				10,
			Math.sin(t) + Math.cos(t * 2) / 10 + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
		)
	})
	return <Instance ref={ref}></Instance>
}
