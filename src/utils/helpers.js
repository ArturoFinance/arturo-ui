import { ethers } from 'ethers'
import {
  WMATIC_CONTRACT_ADDRESS,
  DAI_CONTRACT_ADDRESS,
  QUICKSWAP_CONTRACT_ADDRESS,
  WORKFLOW_CONTRACT_ADDRESS
} from '../constants/contracts'
import WMATIC_CONTRACT_ABI from '../constants/ABI/MumbaiMatic.json'
import DAI_CONTRACT_ABI from '../constants/ABI/MumbaiDai.json'
import QUICKSWAP_CONTRACT_ABI from '../constants/ABI/QuickswapLiquidity.json'
import WORKFLOW_CONTRACT_ABI from '../constants/ABI/Workflow.json'

const { ethereum } = window

export const approveMatic = async (value) => {
  if (ethereum) {
    const amount = ethers.BigNumber.from(value * 1e18)
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner() 

    const MaticContract = new ethers.Contract(WMATIC_CONTRACT_ADDRESS, WMATIC_CONTRACT_ABI, ethers.getDefaultProvider())
    const maticContract = await MaticContract.connect(signer)
    await maticContract.approve(QUICKSWAP_CONTRACT_ADDRESS, amount)
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
    await daiContract.approve(QUICKSWAP_CONTRACT_ADDRESS, amount)
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
    await quickswapLiquidity.addLiquidityToQuickswap(WMATIC_CONTRACT_ADDRESS, DAI_CONTRACT_ADDRESS, maticVal, daiVal)

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
    await quickswapLiquidity.swap(WMATIC_CONTRACT_ADDRESS, DAI_CONTRACT_ADDRESS, amount, minDai)
    return true
  }
}

export const createWorkflow = async () => {
  if (ethereum) {

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner() 

    const WorkflowContract = new ethers.Contract(WORKFLOW_CONTRACT_ADDRESS, WORKFLOW_CONTRACT_ABI, ethers.getDefaultProvider())
    const workflowContract = await WorkflowContract.connect(signer)
    await workflowContract.create()
    return true
  }
}
