import React, { FC, useEffect, useRef } from 'react'
import { Environment, MeshTransmissionMaterial, OrbitControls, useGLTF, useScroll } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { RGBELoader } from 'three-stdlib/loaders/RGBELoader'
import { BackSide, Color, DoubleSide, MathUtils, Mesh, Vector3 } from 'three'
import Face from './Face'
import Blob from './Blob'
import MarchingBubbles from './MarchingBubbles'
import { LayerMaterial, Depth } from 'lamina'
import { useControls } from 'leva'
// import useCheckMobileScreen from '../../hooks/useCheckMobileScreen'
import MarchingBubblesTransmission from './MarchingBubbleTransmission'
import StatsWidget from '../StatsWidget'

interface Props {}

const params = {
	color: 0xffffff,
	// transmission: 1.19,
	transmission: 1.17,
	opacity: 1,
	metalness: 0.1,
	roughness: 0.2,
	ior: 3,
	thickness: 0.9,
	specularIntensity: 0.4,
	specularColor: new Color('#ffffff'),
	depthWrite: true,
}

const Scene: FC<Props> = () => {
	// const mobile = useCheckMobileScreen()

	const data = useScroll()

	const { far, near, bgColor1, bgColor2 } = useControls({
		far: {
			value: 640,
			min: 0,
			max: 1000,
			step: 1,
		},
		near: {
			value: 1000,
			min: 0,
			max: 1000,
			step: 1,
		},
		bgColor1: {
			value: '#070049',
		},
		bgColor2: {
			value: '#016c08',
		},
	})
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
	const config = useControls('logo', {
		box: false,
		meshPhysicalMaterial: false,
		transmissionSampler: false,
		backside: false,
		samples: { value: 10, min: 1, max: 32, step: 1 },
		resolution: { value: 2048, min: 256, max: 2048, step: 256 },
		transmission: { value: 1, min: 0, max: 1 },
		roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
		thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
		ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
		chromaticAberration: { value: 0.06, min: 0, max: 1 },
		anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
		distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
		distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
		temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
		attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
		attenuationColor: '#ffffff',
		color: '#c9ffa1',
		bg: '#839681',
	})
	useThree(({ camera }) => {
		// camera.position.set(0, 0.5, 10)
	})

	const model = useGLTF('/assets/models/mgl3.glb', true) as any
	const map: any = useLoader(RGBELoader as any, '/assets/hdr1.hdr')

	const ref1 = useRef<Mesh>(null!)
	const mglRef = useRef<Mesh>(null!)
	const mglRef2 = useRef<Mesh>(null!)

	useFrame((state, delta) => {
		ref1.current.rotation.x = ref1.current.rotation.y = ref1.current.rotation.z += delta * 0.2
		// mglRef.current.rotation.y = MathUtils.lerp(
		// 	mglRef.current.rotation.y,
		// 	state.mouse.x * 0.4 + offset * -1.4,
		// 	0.05
		// )
		mglRef.current.rotation.x = -MathUtils.lerp(mglRef.current.rotation.x, state.mouse.y * 1, 0.5)
	})

	return (
		<>
			<StatsWidget />
			{/* <OrbitControls position={[1, 1, 1]} enableZoom={true} enablePan={true} enableRotate={true} /> */}
			<Environment files='/assets/hdr1.hdr' />
			{/* <directionalLight position={[5, 5, 5]} castShadow></directionalLight> */}
			<ambientLight intensity={0} />
			<pointLight position={[10, 10, 5]} />
			<pointLight position={[-10, -10, -5]} color={'#00ffff'} />
			<mesh ref={ref1} scale={1}>
				<sphereGeometry args={[800, 32, 32]} />
				<LayerMaterial alpha={0} attach='material' side={BackSide}>
					<Depth
						colorA={bgColor1}
						colorB={bgColor2}
						alpha={1}
						mode='normal'
						near={near}
						far={far}
						origin={[100, 100, 100]}
					/>
				</LayerMaterial>
			</mesh>
			<mesh visible={config.box} scale={3} position={[0, 0.4, 6]}>
				<boxGeometry args={[1, 1, 1]}></boxGeometry>
				{/* <meshBasicMaterial color={'#ffffff'}></meshBasicMaterial> */}
				<MeshTransmissionMaterial background={new Color(config.bg)} {...config} />
			</mesh>
			<mesh
				ref={mglRef}
				scale={1}
				position={[-0.2, 0, 6]}
				rotation={[0, 0, 0]}
				visible={false}
				geometry={model.nodes.CURVO001.geometry}
			>
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
			</mesh>
			{/* <mesh
				ref={mglRef2}
				scale={0.95}
				position={[-0.2, 0, 4]}
				rotation={[0, 0, 0]}
				visible={true}
				geometry={model.nodes.CURVO001.geometry}
			>
				<meshPhongMaterial color={'#00ff00'}></meshPhongMaterial>
			
			</mesh> */}
			{/* <MarchingBubbles /> */}
			{/* <MarchingBubblesTransmission /> */}

			<Face map={map}></Face>
			<Blob />
		</>
	)
}
export default Scene
