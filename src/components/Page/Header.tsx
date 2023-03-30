import { useAtom } from 'jotai'
import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import { copyAtom, langAtom } from '../../Atoms/atoms'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
// ScrollTrigger.normalizeScroll(true)
const HeaderDiv = styled.div`
	padding-top: 10px;
	font-size: 15pt;
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	right: 0;
	position: fixed;
	@media only screen and (max-width: 768px) {
		display: none;
	}
`
const Section = styled.div`
	display: flex;
	margin-right: 2rem;
`
const DivTitle = styled.a`
	padding-left: 3rem;
	margin-right: 1rem;
	font-weight: 100;
	font-family: 'TSKirt';
	font-size: 1.5rem;
	color: whitesmoke;
	&:hover {
		cursor: pointer;
	}
`
const Flexdiv = styled.div`
	display: flex;
	justify-content: space-between;
`

export default function Header({ goToSectionHeader }: { goToSectionHeader: (section: string) => void }) {
	const [lang, setLang] = useAtom(langAtom)
	const [copy] = useAtom(copyAtom)

	return (
		<HeaderDiv>
			<Flexdiv>
				<div>
					<DivTitle
						onClick={() => {
							goToSectionHeader('home-div')
						}}
					>
						MGL
					</DivTitle>
				</div>
				<Section>
					<DivTitle
						onClick={() => {
							goToSectionHeader('services-div')
						}}
					>
						{copy[lang].header.services}
					</DivTitle>
					<DivTitle
						onClick={() => {
							goToSectionHeader('mint-div')
						}}
					>
						{copy[lang].header.wallet}
					</DivTitle>
					<DivTitle
						onClick={() => {
							goToSectionHeader('contact-div')
						}}
					>
						{copy[lang].header.contact}
					</DivTitle>
					<DivTitle
						onClick={() => {
							lang === 'es' ? setLang('en') : setLang('es')
						}}
					>
						{copy[lang].header.language}
					</DivTitle>
				</Section>
			</Flexdiv>
		</HeaderDiv>
	)
}
