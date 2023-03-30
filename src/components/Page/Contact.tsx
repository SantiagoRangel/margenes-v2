import { useAtom } from 'jotai'
import styled from 'styled-components'
import { copyAtom, langAtom } from '../../Atoms/atoms'
const MainDiv = styled.section`
	padding-left: 3rem;
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
	padding-left: 0.4rem;
	@media only screen and (max-width: 768px) {
		width: 90%;
		padding-left: 0.4rem;
		line-height: 2rem;
		margin-top: -2rem;
		font-size: 1.5rem;
	}
`
const SocialDiv = styled.div`
	position: absolute;
	bottom: 20px;
	right: 60px;
	display: flex;
`
const SocialImage = styled.img`
	width: 40px;
	height: auto;
	margin-right: 10px;
`
export default function Contact() {
	const [copy] = useAtom(copyAtom)
	const [lang] = useAtom(langAtom)
	return (
		<MainDiv className='main contact' id='contact-div'>
			<div className='contact-fade'>
				<ContactH1>{copy[lang].contact.title}</ContactH1>
				<ContactH2>{copy[lang].contact.header}</ContactH2>
			</div>
			<SocialDiv>
				<SocialImage src='/assets/images/1.svg' />
				<SocialImage src='/assets/images/2.svg' />
				<SocialImage src='/assets/images/3.svg' />
				<SocialImage src='/assets/images/4.svg' />
				<SocialImage src='/assets/images/5.svg' />
				<SocialImage src='/assets/images/6.svg' />
				<SocialImage src='/assets/images/7.svg' />
			</SocialDiv>
		</MainDiv>
	)
}
