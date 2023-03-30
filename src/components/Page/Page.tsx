import React from 'react'
import About1 from './About1'
import About2 from './About2'
import About3 from './About3'
import Contact from './Contact'
import Empty from './Empty'
import MintPage from './MintPage'
import Services from './Services'

const Page = React.forwardRef((props, ref) => {
	return (
		<>
			<Empty />
			<About1 />
			<About2 />
			<About3 />
			<Services />
			<MintPage />
			<Contact />
		</>
	)
})

export default Page
