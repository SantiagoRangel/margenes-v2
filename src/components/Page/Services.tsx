import { useAtom } from 'jotai'
import styled from 'styled-components'
import { copyAtom, langAtom } from '../../Atoms/atoms'
import { ServiceContent, ServiceH1, ServiceH2 } from '../../styledComponents/styled-components'

const MainDiv = styled.section`
	display: flex;
	flex-direction: column;
	height: 100vh;
	scroll-snap-align: start;
	justify-content: flex-end;
	top: 400vh;
	pointer-events: none;
	position: absolute;
	width: 100vw;
	@media only screen and (max-width: 768px) {
		margin: 0;
		padding-right: 1rem;
		width: 100vw;
	}
`

const ServicesContainer = styled.div`
	display: flex;
	margin-bottom: 5rem;
	justify-content: space-evenly;
	@media only screen and (max-width: 768px) {
		flex-direction: column;
		margin-top: -4rem;
		margin-bottom: 5rem;
	}
`

const ServiceDiv = styled.div`
	@media only screen and (max-width: 768px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: -1rem;
	}
`
export default function Services() {
	const [copy] = useAtom(copyAtom)
	const [lang] = useAtom(langAtom)
	return (
		<MainDiv className='main services' id='services-div'>
			<div className='services-fade'>
				<ServiceH1>{copy[lang].services.header}</ServiceH1>
				<ServicesContainer>
					<ServiceDiv>
						<ServiceH2>{copy[lang].services.section1.title}</ServiceH2>
						{copy[lang].services.section1.texts.map((text: string, i: number) => (
							<ServiceContent key={i}>{text}</ServiceContent>
						))}
					</ServiceDiv>
					<ServiceDiv>
						<ServiceH2>{copy[lang].services.section2.title}</ServiceH2>
						{copy[lang].services.section2.texts.map((text: string, i: number) => (
							<ServiceContent key={i}>{text}</ServiceContent>
						))}
					</ServiceDiv>
					<ServiceDiv>
						<ServiceH2>{copy[lang].services.section3.title}</ServiceH2>
						{copy[lang].services.section3.texts.map((text: string, i: number) => (
							<ServiceContent key={i}>{text}</ServiceContent>
						))}
					</ServiceDiv>
				</ServicesContainer>
			</div>
		</MainDiv>
	)
}
