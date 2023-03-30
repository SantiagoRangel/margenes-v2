import './App.css'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene/Scene'
import Page from './components/Page/Page'
import Header from './components/Page/Header'
import { Suspense, useLayoutEffect } from 'react'
import { Loader } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

const scrolling = {
	enabled: true,
	events: 'wheel,touchmove,pointermove'.split(','),
	prevent: (e: any) => e.preventDefault(),
	disable() {
		if (scrolling.enabled) {
			scrolling.enabled = false
			window.addEventListener('scroll', gsap.ticker.tick, { passive: true })
			scrolling.events.forEach((e, i) =>
				(i ? document : window).addEventListener(e, scrolling.prevent, { passive: false })
			)
		}
	},
	enable() {
		if (!scrolling.enabled) {
			scrolling.enabled = true
			window.removeEventListener('scroll', gsap.ticker.tick)
			scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent))
		}
	},
}
const goToSection = (section: HTMLElement, anim: gsap.core.Tween | undefined) => {
	if (scrolling.enabled) {
		scrolling.disable()
		scrollToSection(section)
		anim && anim.restart()
	}
}
const scrollToSection = (section: HTMLElement) => {
	scrolling.disable() // disable scrolling
	gsap.to(window, {
		scrollTo: { y: section.offsetTop, autoKill: false },
		onComplete: () => {
			scrolling.enable() // re-enable scrolling once the animation is complete
		},
		duration: 1,
	})
}

function App() {
	const setScrollSnapping = () => {
		const sections = document.querySelectorAll('section')
		sections.forEach((section, i) => {
			const intoAnim = gsap.from(section.querySelector('.section'), { yPercent: 40, duration: 1, paused: true })
			ScrollTrigger.create({
				trigger: section,
				start: 'top bottom-=1',
				end: 'bottom top+=1',
				onEnter: () => goToSection(section, intoAnim),
				onEnterBack: () => goToSection(section, undefined),
			})
		})
	}
	const goToSectionHeader = (section: string | null) => {
		const scrollTriggers = ScrollTrigger.getAll()

		scrollTriggers.forEach((trigger) => {
			trigger.disable()
			trigger.kill()
		})

		scrolling.disable() // disable scrolling
		const targetSection = document.getElementById(section!)!
		// targetSection.scrollIntoView()
		scrollToSection(targetSection)
		setScrollSnapping()
	}

	useLayoutEffect(() => {
		gsap.config({
			nullTargetWarn: false,
		})

		setScrollSnapping()
	}, [])
	return (
		<>
			<Canvas>
				{/* <Perf position='bottom-left' /> */}
				<Suspense fallback={null}>
					<Scene />
				</Suspense>
			</Canvas>
			<Loader />
			<Header goToSectionHeader={goToSectionHeader} />
			<Page />
			{/* <Canvas>
				<Perf position='bottom-left' />
				<Suspense fallback={null}>
					<ScrollControls pages={7} damping={0.15} distance={1}>
						<Scene />

						<Scroll html>
							<Page />
						</Scroll>
					</ScrollControls>
				</Suspense>
			</Canvas>
			<Loader />
			<Header /> */}
			{/* <Page /> */}
		</>
	)
}

export default App
