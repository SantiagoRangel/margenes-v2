import styled from 'styled-components'

const PageHeader = styled.h1`
	font-family: 'TSKirt';
	color: whitesmoke;
	font-size: 57pt;
	font-weight: 300;
	width: 34rem;
	margin-bottom: 2.7rem;
	line-height: 72px;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	@media only screen and (max-width: 768px) {
		font-size: 3.5rem;
		letter-spacing: 1px;
		line-height: 3rem;
		width: 90%;
	}
`
const MintHeader = styled.h1`
	font-family: 'TSKirt';
	color: whitesmoke;
	font-size: 65pt;
	font-weight: 300;
	width: 36rem;
	line-height: 77px;

	@media only screen and (max-width: 768px) {
		font-size: 3.5rem;
		width: 100%;
		line-height: 55px;
		text-align: center;
	}
`

const Minth2 = styled.h2`
	font-family: 'TSKirt';
	color: rgb(245, 245, 245);
	font-size: 18pt;
	font-weight: 600;
	line-height: 40px;
	margin-top: -2rem;
	@media only screen and (max-width: 768px) {
		line-height: 1.8rem;
		text-align: center;
	}
`

const MintContent = styled.p`
	font-family: 'TSKirt';
	color: rgb(245, 245, 245);
	font-size: 16pt;
	font-weight: 300;
	margin: 0;
	line-height: 24px;
	letter-spacing: -1px;
	@media only screen and (max-width: 768px) {
		text-align: center;
	}
`

const MintCTA = styled.p`
	font-family: 'TSKirt';
	color: rgb(245, 245, 245);
	font-size: 18pt;
	font-weight: 300;
	margin-top: 1rem;
	text-decoration: underline;
	max-width: 250px;
	pointer-events: auto;
	&:hover {
		cursor: pointer;
	}
	@media only screen and (max-width: 768px) {
		text-align: center;
	}
`

const PageText = styled.h2`
	font-family: 'TSKirt';
	color: whitesmoke;
	font-size: 20pt;
	font-weight: 300;
	width: 27rem;
	line-height: 25px;
	letter-spacing: -1px;
	margin-top: -30px;

	@media only screen and (max-width: 768px) {
		max-width: 90vw;
	}
`

const CallToActionDiv = styled.div`
	border: 3px solid white;
	padding: 0;
	width: 19rem;
	display: flex;
	flex-direction: column;
	pointer-events: auto;
	&:hover {
		cursor: pointer;
	}
`

const CallToActionTitle = styled.p`
	font-family: 'TSKirt';
	color: whitesmoke;
	font-size: 2.5rem;
	font-weight: 300;
	text-align: center;
	letter-spacing: -1px;
	margin: -3px 0 0 0;
`
const CallToActionText = styled.p`
	font-family: 'TSKirt';
	color: whitesmoke;
	font-size: 1rem;
	font-weight: 300;
	text-align: center;
	letter-spacing: -1px;
	margin: 0;
	margin: -17px 0 4px 0;
`

const ServiceH1 = styled.h1`
	font-family: 'TSKirt';
	color: whitesmoke;
	font-size: 57pt;
	font-weight: 300;
	line-height: 72px;
	text-align: center;
	margin-top: -3rem;
	@media only screen and (max-width: 768px) {
		margin-bottom: 2rem;
		font-size: 2.5rem;
	}
`
const ServiceH2 = styled.h2`
	font-family: 'TSKirt';
	color: rgb(245, 245, 245);
	font-size: 23pt;
	font-weight: 600;
	line-height: 40px;
	max-width: 20rem;
	text-align: left;
	@media only screen and (max-width: 768px) {
		font-size: 1.6rem;
	}
`

const ServiceContent = styled.p`
	font-family: 'TSKirt';
	color: rgb(245, 245, 245);
	font-size: 13pt;
	font-weight: 300;
	margin-top: 0;
	line-height: 3px;
	@media only screen and (max-width: 768px) {
	}
`
export {
	PageHeader,
	PageText,
	CallToActionDiv,
	CallToActionText,
	CallToActionTitle,
	ServiceContent,
	ServiceH1,
	ServiceH2,
	MintHeader,
	Minth2,
	MintContent,
	MintCTA,
}
