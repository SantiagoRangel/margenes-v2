import hre from 'hardhat'

// const currentTimestampInSeconds = Math.round(Date.now() / 1000);
// const unlockTime = currentTimestampInSeconds + 60;

// const lockedAmount = hre.ethers.utils.parseEther("0.001");
import dotenv from 'dotenv'
dotenv.config()

const MGLPassContractFactory = await hre.ethers.getContractFactory('MGLPass')
const mglpass = await MGLPassContractFactory.deploy()

await mglpass.deployed()

console.log(`MGLpaSS deployed to ${mglpass.address}`)
