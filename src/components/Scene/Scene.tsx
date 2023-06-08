import { Environment } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { Depth, LayerMaterial } from 'lamina'
import { Leva, useControls } from 'leva'
import { FC, useEffect, useRef } from 'react'
import { BackSide, DefaultLoadingManager, Mesh } from 'three'
import { RGBELoader } from 'three-stdlib/loaders/RGBELoader'
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen'
import { mapPos } from '../../utils/utils'
import Blob from './Blob'
import Face from './Face'
import MarchingBubblesTransmission from './MarchingBubbleTransmission'
import MarchingBubbles from './MarchingBubbles'
import Mgl from './Mgl'
import Pass from './Pass'

interface Props {}

const Scene: FC<Props> = () => {
	const loadingBar = document.querySelector('.loading-bar') as HTMLElement
	const overlayElement = document.querySelector('.overlay') as HTMLElement
	const map: any = useLoader(RGBELoader as any, '/assets/hdr1.hdr', (loader) => {})

	const handleLoadingProgress = (_: any, itemsLoaded: number, itemsTotal: number) => {
		loadingBar!.style.transform = `scaleX(${itemsLoaded / itemsTotal})`
	}

	const handleLoadingComplete = () => {
		loadingBar.classList.add('ended')
		loadingBar.style.transform = ''
		overlayElement.style.display = 'none'
	}

	DefaultLoadingManager.onProgress = handleLoadingProgress
	DefaultLoadingManager.onLoad = handleLoadingComplete

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

	const faceRef = useRef<Mesh>(null!)
	const backgroundSphereRef = useRef<Mesh>(null!)
	const { camera } = useThree()

	const scrollRef = useRef(0)
	const mobile = useCheckMobileScreen()
	useEffect(() => {
		window.addEventListener('scroll', () => {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop
			var docHeight = Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
			)
			var winHeight = window.innerHeight || document.documentElement.clientHeight
			var scrollPercent = scrollTop / (docHeight - winHeight)
			scrollRef.current = scrollPercent
		})
	}, [])

	useFrame((state, delta) => {
		backgroundSphereRef.current.rotation.x =
			backgroundSphereRef.current.rotation.y =
			backgroundSphereRef.current.rotation.z +=
				delta * 0.2

		if (!mobile) {
			if (scrollRef.current > 0.333333333333333333 && scrollRef.current < 0.5) {
				camera.rotation.set(0, Math.PI * (scrollRef.current - 0.333333333333333333) * 2, 0)
				camera.position.set((scrollRef.current - 0.33333) * -150, 0, scrollRef.current * 3 - 0.33333 + 5)
			}
			if (scrollRef.current > 0.5 && scrollRef.current < 0.66666666666) {
				if (faceRef.current) {
					faceRef.current.rotation.y = (scrollRef.current - 0.5) * 6
					faceRef.current.position.x = mapPos(scrollRef.current, 0.5, 0.66666666, -30, -28)
					faceRef.current.position.y = mapPos(scrollRef.current, 0.5, 0.66666666, -6, -6.5)
					faceRef.current.position.z = mapPos(scrollRef.current, 0.5, 0.66666666, 0, 3.4)
				}
			} else if (scrollRef.current > 0.6666 && scrollRef.current < 0.66667666666) {
				faceRef.current.rotation.y = mapPos(state.mouse.x, -1, 1, 0, Math.PI / 10) + Math.PI / 4
			} else if (scrollRef.current > 0.66666666666 && scrollRef.current < 0.83333333) {
				camera.rotation.y = mapPos(scrollRef.current, 0.66666666666, 0.83333333, 1.046595020960006, 0)
				camera.position.x = mapPos(scrollRef.current, 0.66666666666, 0.83333333, -24.986115650172607, 0)
				camera.position.z = mapPos(scrollRef.current, 0.66666666666, 0.83333333, 6.166382313003452, 5)
			}
		}
	})

	return (
		<>
			<Leva hidden />
			<Environment files='/assets/hdr1.hdr' />
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
			{<Mgl scroll={scrollRef} />}

			<MarchingBubbles />
			<MarchingBubblesTransmission />

			{!mobile && <Face map={map} faceRef={faceRef} scroll={scrollRef} />}
			{!mobile && <Blob scroll={scrollRef} />}
			{!mobile && <Pass scroll={scrollRef}></Pass>}
		</>
	)
}
export default Scene
