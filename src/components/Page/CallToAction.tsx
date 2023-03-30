import { useAtom } from 'jotai'
import { copyAtom, langAtom } from '../../Atoms/atoms'
import { CallToActionDiv, CallToActionText, CallToActionTitle } from '../../styledComponents/styled-components'

export default function CallToAction() {
	const [copy] = useAtom(copyAtom)
	const [lang] = useAtom(langAtom)
	return (
		<CallToActionDiv className='callToDiv'>
			<CallToActionTitle>{copy[lang].callToAction.title}</CallToActionTitle>
			<CallToActionText>{copy[lang].callToAction.text}</CallToActionText>
		</CallToActionDiv>
	)
}
