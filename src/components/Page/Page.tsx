import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { copyAtom } from '../../Atoms/atoms'
import About1 from './About1'
import About2 from './About2'
import About3 from './About3'
import Contact from './Contact'
import Empty from './Empty'
import MintPage from './MintPage'
import Services from './Services'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function Page() {
	// this scrolling object just allows us to conveniently call scrolling.enable(), scrolling.disable(), and check if scrolling.enabled is true.
	// some browsers (like iOS Safari) handle scrolling on a separate thread and can cause things to get out of sync (jitter/jumpy), so when we're animating the scroll position, force an update of GSAP tweens when there's a scroll event in order to maintain synchronization)
	const scrolling = {
		enabled: true,
		events: 'scroll,wheel,touchmove,pointermove'.split(','),
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

	function goToSection(section: HTMLElement, anim: gsap.core.Tween | undefined) {
		if (scrolling.enabled) {
			// skip if a scroll tween is in progress
			scrolling.disable()
			gsap.to(window, {
				scrollTo: { y: section, autoKill: false },
				onComplete: scrolling.enable,
				duration: 1,
			})

			anim && anim.restart()
		}
	}

	useEffect(() => {
		gsap.config({
			nullTargetWarn: false,
		})
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
	}, [])
	return (
		<>
			<Empty />

			<About1 />
			<About2 />
			<About3 />
			<Services />
			<MintPage />
			<Contact />
		</>
	)
}
