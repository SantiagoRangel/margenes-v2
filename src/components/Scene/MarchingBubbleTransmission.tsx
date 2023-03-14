import { Color, MathUtils } from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Instances, Instance, MeshTransmissionMaterial } from '@react-three/drei'
import { useControls } from 'leva'

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
			{/* <color attach='background' args={['#f0f0f0']} /> */}
			{/* <fog attach='fog' args={['white', 60, 110]} /> */}
			{/* <pointLight position={[100, 10, -50]} intensity={20} castShadow />
			<pointLight position={[-100, -100, -100]} intensity={10} color='red' /> */}
			<Bubbles />
			{/* <meshPhysicalMaterial
					metalness={params.metalness}
					ior={params.ior}
					roughness={params.roughness}
					thickness={params.thickness}
					transmission={params.transmission}
					specularIntensity={params.specularIntensity}
					opacity={params.opacity}
					depthWrite={params.depthWrite}
				/> */}

			{/* <ContactShadows position={[0, -30, 0]} opacity={0.6} scale={130} blur={1} far={40} />
			<EffectComposer multisampling={0}>
				<SSAO samples={31} radius={0.1} intensity={30} luminanceInfluence={0.1} color='red' />
			</EffectComposer>
			<Suspense fallback={null}>
				<Environment preset='city' />
			</Suspense> */}
		</>
	)
}

function Bubbles() {
	const ref = useRef<any>(null!)

	useFrame((state, delta) => {
		if (ref.current) {
			ref.current.rotation.y = MathUtils.damp(ref.current.rotation.y, (-state.mouse.x * Math.PI) / 6, 2.75, delta)
			ref.current.rotation.x = MathUtils.damp(ref.current.rotation.x, (-state.mouse.y * Math.PI) / 6, 2.75, delta)
		}
	})
	const config = useControls('bubbles transmission', {
		backside: false,
		samples: { value: 10, min: 1, max: 32, step: 1 },
		resolution: { value: 512, min: 256, max: 2048, step: 256 },
		transmission: { value: 1, min: 0, max: 1 },
		roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
		thickness: { value: 10, min: 0, max: 10, step: 0.01 },
		ior: { value: 1.03, min: 1, max: 5, step: 0.01 },
		chromaticAberration: { value: 1, min: 0, max: 1 },
		anisotropy: { value: 0.88, min: 0, max: 1, step: 0.01 },
		distortion: { value: 1.0, min: 0, max: 1, step: 0.01 },
		distortionScale: { value: 0.11, min: 0.01, max: 1, step: 0.01 },
		temporalDistortion: { value: 0.14, min: 0, max: 1, step: 0.01 },
		attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
		attenuationColor: '#ffffff',
		color: '#c9ffa1',
		bg: '#839681',
	})

	return (
		<Instances limit={particles.length} ref={ref} position={[0, 10, -30]}>
			{/* <cylinderGeometry args={[0.5, 0.5, 0.4, 64, 64]}></cylinderGeometry> */}
			<sphereGeometry></sphereGeometry>
			{/* <meshBasicMaterial color={'#ffffff'}></meshBasicMaterial> */}

			<MeshTransmissionMaterial background={new Color(config.bg)} {...config} />
			{/* <meshPhysicalMaterial
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
			/> */}

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
