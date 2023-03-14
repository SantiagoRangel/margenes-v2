import { useAtom } from 'jotai'
import React from 'react'
import styled from 'styled-components'
import { copyAtom, langAtom } from '../../Atoms/atoms'
const MainDiv = styled.section`
	margin-left: 3rem;
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
	scroll-snap-align: start;
	justify-content: center;
	top: 600vh;
	pointer-events: none;
	position: absolute;
	@media only screen and (max-width: 768px) {
	}
`

const ContactH1 = styled.h1`
	font-family: 'TSKirt';
	color: whitesmoke;
	font-size: 65pt;
	font-weight: 300;
	line-height: 77px;

	@media only screen and (max-width: 768px) {
	}
`
const ContactH2 = styled.h2`
	font-family: 'TSKirt';
	color: rgb(245, 245, 245);
	font-size: 18pt;
	font-weight: 300;
	margin-top: -60px;
	text-decoration: underline;
	margin-left: 0.4rem;
	@media only screen and (max-width: 768px) {
		width: 100%;
		padding-left: 0.4rem;
		line-height: 2rem;
		margin-top: -2rem;
		font-size: 1.5rem;
	}
`
export default function Contact() {
	const [copy] = useAtom(copyAtom)
	const [lang] = useAtom(langAtom)
	return (
		<MainDiv className='main' id='contact-div'>
			<ContactH1>{copy[lang].contact.title}</ContactH1>
			<ContactH2>{copy[lang].contact.header}</ContactH2>
		</MainDiv>
	)
}
