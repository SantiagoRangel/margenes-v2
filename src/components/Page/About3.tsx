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
	top: 300vh;
	pointer-events: none;

	@media only screen and (max-width: 768px) {
		margin: 0;
		padding-left: 1.5rem;
		padding-right: 1rem;
		width: 100vw;
	}
`
export default function About3() {
	const [copy] = useAtom(copyAtom)
	const [lang] = useAtom(langAtom)
	return (
		<MainDiv className='main about3' id='about3'>
			<div className='about3-fade'>
				<PageHeader>{copy[lang].about3.header}</PageHeader>
				<PageText>{copy[lang].about3.text}</PageText>
				<CallToAction />
			</div>
		</MainDiv>
	)
}
