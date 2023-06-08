import React, { Dispatch, SetStateAction } from 'react'
import About1 from './About1'
import About2 from './About2'
import About3 from './About3'
import Contact from './Contact'
import Empty from './Empty'
import MintPage from './MintPage'
import Services from './Services'

interface PageProps {
	accounts: string[]
	setAccounts: Dispatch<SetStateAction<string[]>>
	scrolling: any
}

const Page = React.forwardRef(({ accounts, setAccounts, scrolling }: PageProps, ref: any) => {
	return (
		<>
			<div className='overlay'></div>
			<Empty />
			<About1 />
			<About2 />
			<About3 />
			<Services />
			<MintPage accounts={accounts} setAccounts={setAccounts} scrolling={scrolling} />
			<Contact />
		</>
	)
})

export default Page
