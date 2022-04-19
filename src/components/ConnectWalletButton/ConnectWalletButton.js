import React, { useEffect } from 'react'

const ConnectWalletButton = () => {
  useEffect(() => {
    checkWalletIsConnected()
  },[])

  const checkWalletIsConnected = async () => {
    const { ethereum } = window
    
    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_accounts'})
      if (accounts.length !== 0) {
        console.log(accounts[0])
      } else {
        console.log("No authorized account found!")
      }
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window
    
    if (!ethereum) {
      alert("Please install Metamask!")
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
      console.log(accounts[0])
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
      Connect Wallet
    </button>
  )
}

export default ConnectWalletButton