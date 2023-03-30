import styled, { keyframes } from 'styled-components'

const MainDiv = styled.section`
	height: 100vh;
	width: 100vw;
	position: absolute;
	top: 0;
	pointer-events: none;
`
const IconDiv = styled.div`
	display: flex;
	justify-content: center;
	@media only screen and (max-width: 768px) {
		padding-left: -3rem;
	}
`
const breatheAnimation = keyframes`

 50% { transform: translateY(-50%); }
`
const Icon = styled.span`
	position: relative;
	top: 95vh;
	position: absolute;
	&::before {
		color: whitesmoke;
		animation-name: ${breatheAnimation};
		animation-duration: 2s;
		animation-iteration-count: infinite;
		bottom: 2rem;
		content: '╲╱';
		font-size: 1.5rem;
		letter-spacing: -1px;
		opacity: 0.8;
		position: absolute;
		text-align: center;
	}
	@media only screen and (max-width: 768px) {
		top: 90vh;
	}
`

export default function Empty() {
	return (
		<MainDiv className='section' id='home-div'>
			<IconDiv>
				<Icon />
			</IconDiv>
		</MainDiv>
	)
}
