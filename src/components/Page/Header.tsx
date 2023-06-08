import { useAtom } from 'jotai'
import React, { Dispatch, SetStateAction, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { copyAtom, langAtom } from '../../Atoms/atoms'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const HeaderDiv = styled.div`
	padding-top: 10px;
	font-size: 15pt;
	position: fixed;
	z-index: 99;
	top: 0;
	left: 0;
	right: 0;
	position: fixed;
	@media only screen and (max-width: 768px) {
	}
`
const Section = styled.div`
	display: flex;
	margin-right: 2rem;
`
const DivTitle = styled.a`
	padding-left: 3rem;
	margin-right: 1rem;
	font-weight: 100;
	font-family: 'TSKirt';
	font-size: 1.5rem;
	color: whitesmoke;
	&:hover {
		cursor: pointer;
	}
`
const Flexdiv = styled.div`
	display: flex;
	justify-content: space-between;
`
interface HeaderProps {
	accounts: string[]
	setAccounts: Dispatch<SetStateAction<string[]>>
	setScrolling: any
	scrolling: any
}

export default function Header({ accounts, setAccounts, setScrolling, scrolling }: HeaderProps) {
	const [lang, setLang] = useAtom(langAtom)
	const [copy] = useAtom(copyAtom)

	const isConnected = Boolean(accounts[0])

	const abbreviateAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`
	}

	return (
		<HeaderDiv>
			<Flexdiv>
				<div>
					<DivTitle>MGL</DivTitle>
				</div>
				<Section>
					{isConnected && <DivTitle> {abbreviateAddress(accounts[0])}</DivTitle>}

					<DivTitle
						onClick={() => {
							scrolling.disable()
							lang === 'es' ? setLang('en') : setLang('es')
							setTimeout(() => {
								scrolling.enable()
							}, 100)
						}}
					>
						{copy[lang].header.language}
					</DivTitle>
				</Section>
			</Flexdiv>
		</HeaderDiv>
	)
}
