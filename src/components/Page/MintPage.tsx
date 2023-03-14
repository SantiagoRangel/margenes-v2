import { useAtom } from 'jotai'
import React from 'react'
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
		<MainDiv className='main' id='mint-div'>
			<MintHeader>ÚNETE A NUESTRA COMUNIDAD DE CLIENTES</MintHeader>
			<Minth2>El MGLPass, es nuestro NFT de acceso. Te dará beneficios como:</Minth2>
			<MintContent>Estudio empresarial & Estrategia Web3.0</MintContent>
			<MintContent>Acceso a grupo directo con nuestro equipo</MintContent>
			<MintContent>Acceso a información actualizada de la industria Web3.0</MintContent>
			<MintContent>Primer coleccionable NFT MGL</MintContent>
			<MintCTA>MINT NOW</MintCTA>
		</MainDiv>
	)
}
