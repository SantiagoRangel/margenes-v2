import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { MathUtils, Mesh } from 'three'
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen'
import { mapPos } from '../../utils/utils'
interface mglProps {
	scroll: any
}

export default function Mgl({ scroll }: mglProps) {
	const mglRef = useRef<Mesh>(null!)
	const model = useGLTF('/assets/models/mgl3.glb', true) as any

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
		thickness,
		metalness,
		roughness,
		depthWrite,
	} = useControls('Logo, Face', {
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
			value: 0.8,
			min: 0,
			max: 1,
			step: 0.1,
		},
		clearcoatRoughness: {
			value: 0.1,
			min: 0,
			max: 1,
			step: 0.1,
		},
		ior: {
			value: 0.6,
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
			value: 70,
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
	const mobile = useCheckMobileScreen()

	useFrame((state, delta) => {
		mglRef.current.rotation.x = -MathUtils.lerp(mglRef.current.rotation.x, state.mouse.y * 1, 0.5)
		mglRef.current.rotation.y = -MathUtils.lerp(mglRef.current.rotation.y, state.mouse.x * -1, 0.5)
		if (scroll) {
			if (mobile) {
				mglRef.current.rotation.y = scroll.current * 38
			} else {
				if (scroll.current < 0.1666) {
					mglRef.current.position.x = MathUtils.lerp(mglRef.current.position.x, scroll.current * 20 - 0.2, 0.5)
				} else if (scroll.current > 0.6666666 && scroll.current < 0.8333333) {
					mglRef.current.position.x = mapPos(scroll.current, 0.6666666, 0.83333333, 3.13, 9)
				}
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
		</mesh>
	)
}
