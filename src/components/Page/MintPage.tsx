import { useAtom } from 'jotai'
import styled from 'styled-components'
import { copyAtom, langAtom } from '../../Atoms/atoms'
import { MintContent, MintCTA, Minth2, MintHeader } from '../../styledComponents/styled-components'
import { Dispatch, SetStateAction } from 'react'
import { ethers, BigNumber } from 'ethers'
import mglPass from '../../MglPass.json'

const mglPassAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

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
		margin-left: 1rem;
		padding: 0;
		width: 90%;
	}
`

interface MintPageProps {
	accounts: string[]
	setAccounts: Dispatch<SetStateAction<string[]>>
	scrolling: any
}

export default function MintPage({ accounts, setAccounts, scrolling }: MintPageProps) {
	const [copy] = useAtom(copyAtom)
	const [lang] = useAtom(langAtom)

	const isConnected = Boolean(accounts[0])

	const handleMint = async () => {
		if (!window.ethereum) return
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const contract = new ethers.Contract(mglPassAddress, mglPass.abi, signer)
		try {
			const response = await contract.mint({
				value: ethers.utils.parseEther((1).toString()),
			})

			console.log(response)
		} catch (err: any) {
			console.log(err)
			if (err.data) {
				let errorReason = ethers.utils.toUtf8String('0x' + err.data.message.substring(138))
				console.log(errorReason)
			} else {
				console.log(err)
			}
		}
	}

	const connectAccount = async () => {
		if (window.ethereum) {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
			console.log(accounts)
			setAccounts(accounts)
		}
	}

	return (
		<MainDiv className='main mintPage' id='mint-div'>
			<div className='mintPage-fade'>
				<MintHeader>{copy[lang].mint.title}</MintHeader>
				<Minth2>{copy[lang].mint.header}</Minth2>
				{copy[lang].mint.texts.map((text: string, i: number) => (
					<MintContent key={i}>{text}</MintContent>
				))}

				{isConnected ? (
					<MintCTA onClick={handleMint}>{copy[lang].mint.cta}</MintCTA>
				) : (
					<MintCTA
						onClick={() => {
							scrolling.disable()
							connectAccount()
							setTimeout(() => {
								scrolling.enable()
							}, 200)
						}}
					>
						Connect wallet to mint
					</MintCTA>
				)}
			</div>
		</MainDiv>
	)
}
