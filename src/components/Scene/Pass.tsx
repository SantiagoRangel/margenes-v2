import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MathUtils, Mesh } from 'three'
import { mapPos } from '../../utils/utils'
interface passProps {
	scroll: any
}

export default function Pass({ scroll }: passProps) {
	const model = useGLTF('/assets/models/ball.glb', true) as any
	model.materials.base.color.r = 0
	model.materials.base.color.g = 0
	model.materials.base.color.b = 0

	model.materials.outer.color.r = 0
	model.materials.outer.color.g = 0.8
	model.materials.outer.color.b = 0
	const passRef = useRef<Mesh>(null!)
	useFrame((state, delta) => {
		passRef.current.rotation.y = -MathUtils.lerp(passRef.current.rotation.y, state.mouse.x * -1, 1)

		if (scroll.current > 0.6666666 && scroll.current < 1) {
			passRef.current.position.x = 2.5
			passRef.current.scale.x = mapPos(scroll.current, 0.8333333, 1, 1, 0)
			passRef.current.scale.y = mapPos(scroll.current, 0.8333333, 1, 1, 0)
			passRef.current.scale.z = mapPos(scroll.current, 0.8333333, 1, 1, 0)
		} else {
			passRef.current.position.x = 20
		}
	})
	return <primitive ref={passRef} object={model.scene} position={[0, -1.3, 0]} scale={1} />
}
