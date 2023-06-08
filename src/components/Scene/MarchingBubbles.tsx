import { Instance, Instances } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Color, MathUtils, MeshBasicMaterial, SphereGeometry } from 'three'

const particles = Array.from({ length: 20 }, () => ({
	factor: MathUtils.randInt(20, 100),
	speed: MathUtils.randFloat(0.01, 1),
	xFactor: MathUtils.randFloatSpread(50),
	yFactor: MathUtils.randFloatSpread(80),
	zFactor: MathUtils.randFloatSpread(10),
}))

export default function MarchingBubbles() {
	return (
		<>
			<Bubbles />
		</>
	)
}
const sphereGeometry = new SphereGeometry(1, 32, 16)
const sphereMaterial = new MeshBasicMaterial({ color: '#01b901' })

function Bubbles() {
	const ref = useRef<any>(null!)

	useFrame((state, delta) => {
		if (ref.current) {
			ref.current.rotation.y = MathUtils.damp(ref.current.rotation.y, (-state.mouse.x * Math.PI) / 6, 2.75, delta)
			ref.current.rotation.x = MathUtils.damp(ref.current.rotation.x, (-state.mouse.y * Math.PI) / 6, 2.75, delta)
		}
	})

	return (
		<Instances
			limit={particles.length}
			ref={ref}
			position={[0, 10, -20]}
			args={[sphereGeometry, sphereMaterial, 15]}
		>
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
		ref.current.scale.setScalar(Math.max(2, Math.cos(t) * 5))
		ref.current.position.set(
			Math.cos(t) + Math.sin(t * 1) / 10 + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
			Math.sin(t) +
				Math.cos(t * 2) / 10 +
				yFactor +
				Math.sin((t / 10) * factor) +
				(Math.cos(t * 2) * factor) / 10 -
				10,
			Math.sin(t) +
				Math.cos(t * 2) / 10 +
				zFactor +
				Math.cos((t / 10) * factor) +
				(Math.sin(t * 3) * factor) / 10 -
				10
		)
	})
	return <Instance ref={ref}></Instance>
}
