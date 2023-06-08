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
		padding: 0;
	}
`

const ContactH1 = styled.h1`
	font-family: 'TSKirt';
	color: whitesmoke;
	font-size: 65pt;
	font-weight: 300;
	line-height: 77px;

	@media only screen and (max-width: 768px) {
		text-align: center;
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
		text-align: center;
		padding: 0;
		line-height: 2rem;
		margin-top: -2rem;
		font-size: 1.5rem;
	}
`
const SocialDiv = styled.div`
	pointer-events: auto;
	position: absolute;
	bottom: 20px;
	right: 60px;
	display: flex;
	@media only screen and (max-width: 768px) {
		right: 10px;
	}
`
const SocialImage = styled.img`
	width: 35px;
	height: auto;
	margin-right: 10px;
	&:hover {
		cursor: pointer;
	}
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
				<SocialImage
					src='/assets/images/1.svg'
					onClick={() => {
						window.open('https://www.linkedin.com/company/margeneslabs/', '_blank')!.focus()
					}}
				/>
				<SocialImage
					src='/assets/images/2.svg'
					onClick={() => {
						window.open('https://opensea.io/MargenesLabs/created', '_blank')!.focus()
					}}
				/>
				<SocialImage
					src='/assets/images/3.svg'
					onClick={() => {
						window
							.open(
								'https://open.spotify.com/show/1vlHxHsEZaWHFueRpOjrLy?si=drBBRDLrT--FtXt8w27X9w&nd=1',
								'_blank'
							)!
							.focus()
					}}
				/>
				<SocialImage
					src='/assets/images/4.svg'
					onClick={() => {
						window.open('https://twitter.com/margeneslabs', '_blank')!.focus()
					}}
				/>
				<SocialImage
					src='/assets/images/5.svg'
					onClick={() => {
						//TODO
						window.open('https://instagram.com/mglabs.eth?igshid=YmMyMTA2M2Y=', '_blank')!.focus()
					}}
				/>
				<SocialImage
					src='/assets/images/6.svg'
					onClick={() => {
						window.open('https://www.tiktok.com/@margeneslabs?_t=8VV601aZJyg&_r=1', '_blank')!.focus()
					}}
				/>
				<SocialImage
					src='/assets/images/7.svg'
					onClick={() => {
						window.open('https://www.youtube.com/channel/UCeZEjAcGQ21k0GPZv76ZLkA', '_blank')!.focus()
					}}
				/>
			</SocialDiv>
		</MainDiv>
	)
}
