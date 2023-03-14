import { useAtom } from 'jotai'
import React from 'react'
import styled from 'styled-components'
import { copyAtom, langAtom } from '../../Atoms/atoms'
import {
	CallToActionDiv,
	CallToActionText,
	CallToActionTitle,
	PageHeader,
	PageText,
} from '../../styledComponents/styled-components'
import CallToAction from './CallToAction'

const MainDiv = styled.section`
	margin-left: 3rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 55vw;
	height: 100vh;
	position: absolute;
	top: 300vh;
	pointer-events: none;

	@media only screen and (max-width: 768px) {
		margin: 0;
		padding-left: 1.5rem;
		padding-right: 1rem;
		width: 100vw;
	}
`
export default function About2() {
	const [copy] = useAtom(copyAtom)
	const [lang] = useAtom(langAtom)
	return (
		<MainDiv className='main' id='scroll'>
			<PageHeader>{copy[lang].about3.header}</PageHeader>
			<PageText>{copy[lang].about3.text}</PageText>

			<CallToAction />
		</MainDiv>
	)
}
