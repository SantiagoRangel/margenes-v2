import { useAtom } from 'jotai'
import styled from 'styled-components'
import { copyAtom, langAtom } from '../../Atoms/atoms'
import { MintContent, MintCTA, Minth2, MintHeader } from '../../styledComponents/styled-components'

const MainDiv = styled.section`
	display: flex;
	flex-direction: column;
	padding-left: 3rem;
	height: 100vh;
	scroll-snap-align: start;
	justify-content: center;
	top: 500vh;
	pointer-events: none;
	position: absolute;
	@media only screen and (max-width: 768px) {
		margin: 0;
		padding-left: 1.5rem;
		padding-right: 1rem;
		width: 90%;
	}
`
export default function MintPage() {
	const [copy] = useAtom(copyAtom)
	const [lang] = useAtom(langAtom)
	return (
		<MainDiv className='main mintPage' id='mint-div'>
			<div className='mintPage-fade'>
				<MintHeader>{copy[lang].mint.title}</MintHeader>
				<Minth2>{copy[lang].mint.header}</Minth2>
				{copy[lang].mint.texts.map((text: string, i: number) => (
					<MintContent key={i}>{text}</MintContent>
				))}

				<MintCTA>{copy[lang].mint.cta}</MintCTA>
			</div>
		</MainDiv>
	)
}
