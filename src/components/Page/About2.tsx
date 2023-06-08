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
	position: absolute;
	top: 200vh;
	pointer-events: none;

	@media only screen and (max-width: 768px) {
		margin: 0;
		padding: 0;
		width: 100vw;
	}
`
export default function About2() {
	const [copy] = useAtom(copyAtom)
	const [lang] = useAtom(langAtom)
	return (
		<MainDiv className='about2' id='about2'>
			<div className='about2-fade'>
				<PageHeader>{copy[lang].about2.header}</PageHeader>
				<PageText>{copy[lang].about2.text}</PageText>
				<CallToAction />
			</div>
		</MainDiv>
	)
}
