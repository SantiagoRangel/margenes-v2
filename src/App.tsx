import './App.css'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene/Scene'
import { Perf } from 'r3f-perf'
import Page from './components/Page/Page'
import { createGlobalStyle } from 'styled-components'
import Header from './components/Page/Header'
import { Scroll, ScrollControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

function App() {
	return (
		<>
			<Canvas>
				<Perf position='bottom-left' />
				<Scene />
				{/* <ScrollControls pages={7} damping={0.15} distance={1}>
					<Scene />

					<Scroll html>
						<Page />
					</Scroll>
				</ScrollControls> */}
			</Canvas>
			<Header />
			<Page />
		</>
	)
}

export default App
