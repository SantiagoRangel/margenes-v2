import { Environment } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { Depth, LayerMaterial } from 'lamina'
import { useControls } from 'leva'
import { FC, useEffect, useRef } from 'react'
import { BackSide, Color, Mesh } from 'three'
import { RGBELoader } from 'three-stdlib/loaders/RGBELoader'
import MarchingBubbles from './MarchingBubbles'
// import useCheckMobileScreen from '../../hooks/useCheckMobileScreen'
import StatsWidget from '../StatsWidget'
import Mgl from './Mgl'
import MarchingBubblesTransmission from './MarchingBubbleTransmission'
import Face from './Face'
import Blob from './Blob'

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

	// const data = useScroll()
	const map: any = useLoader(RGBELoader as any, '/assets/hdr1.hdr')

	const { far, near, bgColor1, bgColor2 } = useControls({
		far: {
			value: 563,
			min: 0,
			max: 1000,
			step: 1,
		},
		near: {
			value: 941,
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

	const rotatingSphereConfig = {
		far: 563,
		near: 941,
		bgColor1: '#070049',
		bgColor2: '#016c08',
	}
	useThree(({ camera }) => {
		// camera.position.set(0, 0.5, 10)
	})

	const backgroundSphereRef = useRef<Mesh>(null!)
	const mglRef = useRef<Mesh>(null!)
	const mglRef2 = useRef<Mesh>(null!)

	const scrollRef = useRef(0)

	useEffect(() => {
		// window.addEventListener('scroll', () => {
		// 	var scrollTop = window.pageYOffset || document.documentElement.scrollTop
		// 	var docHeight = Math.max(
		// 		document.body.scrollHeight,
		// 		document.body.offsetHeight,
		// 		document.documentElement.clientHeight,
		// 		document.documentElement.scrollHeight,
		// 		document.documentElement.offsetHeight
		// 	)
		// 	var winHeight = window.innerHeight || document.documentElement.clientHeight
		// 	var scrollPercent = scrollTop / (docHeight - winHeight)
		// 	scrollRef.current = scrollPercent
		// })
	}, [])

	useFrame((state, delta) => {
		backgroundSphereRef.current.rotation.x =
			backgroundSphereRef.current.rotation.y =
			backgroundSphereRef.current.rotation.z +=
				delta * 0.2
		// mglRef.current.rotation.y = MathUtils.lerp(
		// 	mglRef.current.rotation.y,
		// 	state.mouse.x * 0.4 + offset * -1.4,
		// 	0.05
		// )
		// mglRef.current.rotation.x = -MathUtils.lerp(mglRef.current.rotation.x, state.mouse.y * 1, 0.5)
		// mglRef.current.rotation.y = -MathUtils.lerp(mglRef.current.rotation.y, state.mouse.x * -1, 0.5)
	})
	return (
		<>
			<StatsWidget />
			{/* <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} /> */}
			<Environment files='/assets/hdr1.hdr' />
			{/* <directionalLight position={[5, 5, 5]} castShadow></directionalLight> */}
			{/* <ambientLight intensity={0} />
			<pointLight position={[10, 10, 5]} />
			<pointLight position={[-10, -10, -5]} color={'#00ffff'} /> */}
			<mesh visible={true} ref={backgroundSphereRef} scale={1}>
				<sphereGeometry args={[800, 7, 7]} />
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

			<Mgl scroll={scrollRef} />
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
			<MarchingBubbles />
			<MarchingBubblesTransmission />

			<Face map={map}></Face>
			<Blob scroll={scrollRef} />
		</>
	)
}
export default Scene
