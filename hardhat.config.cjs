require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()
require('@nomiclabs/hardhat-etherscan')
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.17',
	networks: {
		mainnet: {
			url: process.env.REACT_APP_MAINNET_RPC_CALL_URL,
			accounts: [process.env.REACT_APP_PRIVATE_KEY_MGL],
		},
		sepolia: {
			url: process.env.REACT_APP_SEPOLIA_RPC_CALL_URL,
			accounts: [process.env.REACT_APP_PRIVATE_KEY_MGL],
		},
	},
	etherscan: {
		apiKey: {
			sepolia: process.env.REACT_APP_ETHERSCAN_KEY,
			mainnet: process.env.REACT_APP_ETHERSCAN_KEY,
		},
	},
}
