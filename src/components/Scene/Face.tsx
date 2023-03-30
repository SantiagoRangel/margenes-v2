import { MeshTransmissionMaterial, useGLTF, useScroll } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { FC, useRef } from 'react'
import * as THREE from 'three'
import { Mesh } from 'three'

interface Props {
	map: any
	material?: any
}
const Face: FC<Props> = ({ map, material }) => {
	const model = useGLTF('/assets/models/cara.glb', true) as any

	const faceRef = useRef<Mesh>(null!)
	const data = useScroll()
	const { camera } = useThree()
	// const action = useRef<THREE.AnimationAction>(null!)
	// const mixer = useRef<THREE.AnimationMixer>(null!)
	// console.log(model)
	// console.log(mixer)

	// useFrame((state, delta) => {
	// 	if (!mixer.current || !action.current) return

	// 	if (mixer.current.time > 4.6) {
	// 		;(action.current as THREE.AnimationAction).stop()
	// 		mixer.current.time = 0
	// 		;(action.current as THREE.AnimationAction).play()
	// 	}

	// 	mixer.current.update(delta)
	// 	let a = data.range(1 / 3, 2 / 3)
	// 	camera.rotation.y = (Math.PI / 4) * a
	// 	camera.position.x = a * -25 + 0
	// 	camera.position.y = a * 0 + 0.5
	// 	camera.position.z = a * 0 + 10
	// })
	const config = useControls('face', {
		meshPhysicalMaterial: false,
		transmissionSampler: true,
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
	// useEffect(() => {
	// 	mixer.current = new THREE.AnimationMixer(model)
	// 	action.current = mixer.current.clipAction(model.animations[0])
	// 	action.current.loop = THREE.LoopRepeat
	// 	action.current.play()
	// }, [])

	return (
		<>
			{/* <primitive object={model.scene} position={[-30, 0, 0]} scale={[4, 4, 4]} /> */}
			<mesh ref={faceRef} geometry={model.nodes.Main_Fluid.geometry} position={[-30, 0, 0]} scale={[4, 4, 4]}>
				<MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />

				{/* <meshPhysicalMaterial
					transmission={material.transmission}
					clearcoat={material.clearcoat}
					clearcoatRoughness={material.clearcoatRoughness}
					ior={material.ior}
					reflectivity={material.reflectivity}
					sheen={material.sheen}
					sheenRoughness={material.sheenRoughness}
					specularIntensity={material.specularIntensity}
					specularColor={material.specularColor}
					thickness={material.thickness}
					metalness={material.metalness}
					roughness={material.roughness}
					attenuationColor={material.attenuationColor}
					depthWrite={material.depthWrite}
				/> */}
			</mesh>
		</>
	)
}
export default Face
