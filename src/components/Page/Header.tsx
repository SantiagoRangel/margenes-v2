import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { copyAtom, langAtom } from '../../Atoms/atoms'

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
	margin-left: 3rem;
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
export default function Header() {
	const [lang, setLang] = useAtom(langAtom)
	const [copy] = useAtom(copyAtom)

	return (
		<HeaderDiv>
			<Flexdiv>
				<div>
					<DivTitle
						onClick={() => {
							document.getElementById('home-div')?.scrollIntoView({ behavior: 'smooth' })
						}}
					>
						MGL
					</DivTitle>
				</div>
				<Section>
					<DivTitle
						onClick={() => {
							document.getElementById('services-div')?.scrollIntoView({ behavior: 'smooth' })
						}}
					>
						{copy[lang].header.services}
					</DivTitle>
					<DivTitle
						onClick={() => {
							document.getElementById('mint-div')?.scrollIntoView({ behavior: 'smooth' })
						}}
					>
						{copy[lang].header.wallet}
					</DivTitle>
					<DivTitle
						onClick={() => {
							document.getElementById('contact-div')?.scrollIntoView({ behavior: 'smooth' })
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
