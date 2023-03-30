import { useAtom } from 'jotai'
import styled from 'styled-components'
import { copyAtom, langAtom } from '../../Atoms/atoms'
import { PageHeader, PageText } from '../../styledComponents/styled-components'
import CallToAction from './CallToAction'

const MainDiv = styled.section`
	padding-left: 3rem;
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
		<MainDiv className='about1' id='about1'>
			<div className='about1-fade'>
				<PageHeader>{copy[lang].about1.header}</PageHeader>
				<PageText>{copy[lang].about1.text}</PageText>
				<CallToAction />
			</div>
		</MainDiv>
	)
}
