import { ethers } from 'ethers'
import {
  WMATIC_CONTRACT_ADDRESS,
  DAI_CONTRACT_ADDRESS,
  QUICKSWAP_CONTRACT_ADDRESS
} from '../constants/contracts'
import WMATIC_CONTRACT_ABI from '../constants/ABI/MumbaiMatic.json'
import DAI_CONTRACT_ABI from '../constants/ABI/MumbaiDai.json'
import QUICKSWAP_CONTRACT_ABI from '../constants/ABI/QuickswapLiquidity.json'

const { ethereum } = window

export const approveMatic = async (value) => {
  if (ethereum) {
    const amount = ethers.BigNumber.from(value * 1e18)
    console.log(amount)
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner() 

    const MaticContract = new ethers.Contract(WMATIC_CONTRACT_ADDRESS, WMATIC_CONTRACT_ABI, ethers.getDefaultProvider())
    const maticContract = await MaticContract.connect(signer)
    const response = await maticContract.approve(QUICKSWAP_CONTRACT_ADDRESS, amount)
    console.log({response})
    return true
  }
}

export const approveDai = async (value) => {
  if (ethereum) {
    const amount = ethers.BigNumber.from(value * 1e18)
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner() 

    const DaiContract = new ethers.Contract(DAI_CONTRACT_ADDRESS, DAI_CONTRACT_ABI, ethers.getDefaultProvider())
    const daiContract = await DaiContract.connect(signer)
    const response = await daiContract.approve(QUICKSWAP_CONTRACT_ADDRESS, amount)
    console.log({response})
    return true
  }
}

export const addLiquidity = async (matic, dai) => {
  if (ethereum) {
    const maticVal = ethers.BigNumber.from(matic * 1e18)
    const daiVal = ethers.BigNumber.from(dai * 1e18)

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner() 

    const QuickswapLiquidity = new ethers.Contract(QUICKSWAP_CONTRACT_ADDRESS, QUICKSWAP_CONTRACT_ABI, ethers.getDefaultProvider())
    const quickswapLiquidity = await QuickswapLiquidity.connect(signer)
    const response = await quickswapLiquidity.addLiquidityToQuickswap(WMATIC_CONTRACT_ADDRESS, DAI_CONTRACT_ADDRESS, maticVal, daiVal)
    console.log({response})
    return true
  }
}

export const swap = async (value) => {
  if (ethereum) {
    const amount = ethers.BigNumber.from(value * 1e18)
    const minDai = ethers.BigNumber.from(10000000000000)

    await approveMatic(value)

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner() 

    const QuickswapLiquidity = new ethers.Contract(QUICKSWAP_CONTRACT_ADDRESS, QUICKSWAP_CONTRACT_ABI, ethers.getDefaultProvider())
    const quickswapLiquidity = await QuickswapLiquidity.connect(signer)
    const response = await quickswapLiquidity.swap(WMATIC_CONTRACT_ADDRESS, DAI_CONTRACT_ADDRESS, amount, minDai)
    console.log({response})
    return true
  }
}
