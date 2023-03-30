import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MathUtils, Mesh } from 'three'

interface mglProps {
	scroll: any
}
export default function Mgl({ scroll }: mglProps) {
	const mglRef = useRef<Mesh>(null!)
	const model = useGLTF('/assets/models/mgl3.glb', true) as any
	// const config = useControls('logo', {
	// 	box: false,
	// 	meshPhysicalMaterial: false,
	// 	transmissionSampler: true,
	// 	backside: true,
	// 	samples: { value: 6, min: 1, max: 32, step: 1 },
	// 	resolution: { value: 128, min: 2, max: 2048, step: 2 },
	// 	backsideResolution: { value: 128, min: 2, max: 2048, step: 2 },

	// 	transmission: { value: 1, min: 0, max: 1 },
	// 	roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
	// 	thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
	// 	ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
	// 	chromaticAberration: { value: 0.06, min: 0, max: 1 },
	// 	anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
	// 	distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
	// 	distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
	// 	temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
	// 	attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
	// 	attenuationColor: '#ffffff',
	// 	color: '#c9ffa1',
	// 	bg: '#839681',
	// })
	const config2 = {
		transmission: 1.01,
		metalness: 0,
		roughness: 0.38,
		attenuationColor: '#ffffff',
		clearcoat: 0.3,
		clearcoatRoughness: 0.4,
		ior: 0.6,
		reflectivity: 0.5,
		sheen: 0,
		sheenRoughness: 1,
		sheenColor: '#ffffff',
		specularIntensity: 0.4,
		specularColor: '#ffffff',
		thickness: 0.9,
		envMapIntensity: 1,
		depthWrite: true,
	}
	// const {
	// 	transmission,
	// 	attenuationColor,
	// 	clearcoat,
	// 	clearcoatRoughness,
	// 	ior,
	// 	reflectivity,
	// 	sheen,
	// 	sheenRoughness,
	// 	specularIntensity,
	// 	specularColor,
	// 	thickness,
	// 	metalness,
	// 	roughness,
	// 	depthWrite,
	// } = useControls('Logo, Face', {
	// 	transmission: {
	// 		value: 1.01,
	// 		min: 0,
	// 		max: 5,
	// 		step: 0.01,
	// 	},
	// 	metalness: {
	// 		value: 0,
	// 		min: 0,
	// 		max: 1,
	// 		step: 0.01,
	// 	},
	// 	roughness: {
	// 		value: 0.38,
	// 		min: 0,
	// 		max: 1,
	// 		step: 0.01,
	// 	},
	// 	attenuationColor: {
	// 		value: '#ffffff',
	// 	},
	// 	clearcoat: {
	// 		value: 0.3,
	// 		min: 0,
	// 		max: 1,
	// 		step: 0.1,
	// 	},
	// 	clearcoatRoughness: {
	// 		value: 0.4,
	// 		min: 0,
	// 		max: 1,
	// 		step: 0.1,
	// 	},
	// 	ior: {
	// 		value: 0.6,
	// 		min: 1,
	// 		max: 2.3,
	// 		step: 0.1,
	// 	},
	// 	reflectivity: {
	// 		value: 0.5,
	// 		min: 0,
	// 		max: 1,
	// 		step: 0.1,
	// 	},
	// 	sheen: {
	// 		value: 0,
	// 		min: 0,
	// 		max: 1,
	// 		step: 0.1,
	// 	},
	// 	sheenRoughness: {
	// 		value: 1,
	// 		min: 0,
	// 		max: 1,
	// 		step: 0.1,
	// 	},
	// 	sheenColor: {
	// 		value: '#ffffff',
	// 	},
	// 	specularIntensity: {
	// 		value: 0.4,
	// 		min: 0,
	// 		max: 1,
	// 		step: 0.1,
	// 	},
	// 	specularColor: {
	// 		value: '#ffffff',
	// 	},
	// 	thickness: {
	// 		value: 0.9,
	// 		min: 0,
	// 		max: 20,
	// 		step: 0.1,
	// 	},
	// 	envMapIntensity: {
	// 		value: 1,
	// 		min: 0,
	// 		max: 20,
	// 		step: 0.1,
	// 	},
	// 	depthWrite: {
	// 		value: true,
	// 	},
	// })

	useFrame((state, delta) => {
		// ref1.current.rotation.x = ref1.current.rotation.y = ref1.current.rotation.z += delta * 0.2
		// mglRef.current.rotation.y = MathUtils.lerp(
		// 	mglRef.current.rotation.y,
		// 	state.mouse.x * 0.4 + offset * -1.4,
		// 	0.05
		// )
		// console.log(scroll)
		mglRef.current.rotation.x = -MathUtils.lerp(mglRef.current.rotation.x, state.mouse.y * 1, 0.5)
		mglRef.current.rotation.y = -MathUtils.lerp(mglRef.current.rotation.y, state.mouse.x * -1, 0.5)
		if (scroll) {
			if (scroll.current < 0.1666) {
				// mglRef.current.position.x = scroll.current * 10 - 0.2
				mglRef.current.position.x = MathUtils.lerp(mglRef.current.position.x, scroll.current * 20 - 0.2, 0.5)
				// mglRef.current.rotation.y = -MathUtils.lerp(mglRef.current.rotation.y, state.mouse.x * -1, 0.5)
			} else {
				// mglRef.current.rotation.y = -MathUtils.lerp(mglRef.current.rotation.y, state.mouse.x * -1 + 0.9, 0.5)
			}
		}
	})
	return (
		<mesh
			ref={mglRef}
			scale={1}
			position={[-0.2, 0, 0]}
			rotation={[0, 0, 0]}
			visible={true}
			geometry={model.nodes.CURVO001.geometry}
		>
			{/* <meshPhysicalMaterial {...config2} /> */}
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
			<meshBasicMaterial color={'#01b901'}></meshBasicMaterial>
			{/* <MeshTransmissionMaterial background={new Color(config.bg)} {...config} /> */}
		</mesh>
	)
}
