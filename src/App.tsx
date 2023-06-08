import './App.css'
import { Canvas, useThree } from '@react-three/fiber'
import Scene from './components/Scene/Scene'
import Page from './components/Page/Page'
import Header from './components/Page/Header'
import { Suspense, useLayoutEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

function App() {
	const [accounts, setAccounts] = useState<string[]>([])

	const [scrolling, setScrolling] = useState({
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
	})

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
	const setScrollSnapping = () => {
		const sections = document.querySelectorAll('section')
		sections.forEach((section, i) => {
			const intoAnim = gsap.from(section.querySelector('.section'), { yPercent: 40, duration: 1, paused: true })
			ScrollTrigger.create({
				trigger: section,
				start: 'top bottom-=1',
				end: 'bottom top+=1',
				onEnter: () => {
					if (scrolling.enabled) {
						goToSection(section, intoAnim)
					}
				},
				onEnterBack: () => {
					if (scrolling.enabled) {
						goToSection(section, undefined)
					}
				},
			})
		})
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
				<Scene />
			</Canvas>

			<Header accounts={accounts} setAccounts={setAccounts} setScrolling={setScrolling} scrolling={scrolling} />
			<Page accounts={accounts} setAccounts={setAccounts} scrolling={scrolling} />
			<div className='loading-bar'></div>
		</>
	)
}

export default App
