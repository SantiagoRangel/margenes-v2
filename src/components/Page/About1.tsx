import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from './Header'
import { keyframes } from 'styled-components'
import {
	PageHeader,
	PageText,
	CallToActionDiv,
	CallToActionTitle,
	CallToActionText,
} from '../../styledComponents/styled-components'
import { useAtom } from 'jotai'
import { copyAtom, langAtom } from '../../Atoms/atoms'
import CallToAction from './CallToAction'

const MainDiv = styled.section`
	margin-left: 3rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 55vw;
	height: 100vh;
	width: 100vw;
	position: absolute;
	top: 100vh;
	pointer-events: none;
	@media only screen and (max-width: 768px) {
		margin: 0;
		padding-left: 1.5rem;
		padding-right: 1rem;
		width: 100vw;
	}
`

export default function About1() {
	const [copy] = useAtom(copyAtom)
	const [lang] = useAtom(langAtom)

	return (
		<MainDiv className='section'>
			<PageHeader>{copy[lang].about1.header}</PageHeader>
			<PageText>{copy[lang].about1.text}</PageText>
			<CallToAction />
		</MainDiv>
	)
}
