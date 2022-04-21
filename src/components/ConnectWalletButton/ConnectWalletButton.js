import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from "web3modal";

const ConnectWalletButton = () => {
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState(null)

  const providerOptions = {};
  const web3Modal = new Web3Modal({
    network: "testnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  });

  useEffect(() => {
    checkWalletIsConnected()
  }, [])

  const checkWalletIsConnected = async () => {
    const { ethereum } = window
    
    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_accounts'})
      if (accounts.length !== 0) {
        setConnected(true)
        setAccount(accounts[0])
      } else {
        setConnected(false)
        setAccount(null)
      }
    }
  }

  const handleConnect = async () => {
    const instance = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const account = await signer.getAddress()
    const { ethereum } = window
    
    setConnected(true)
    setAccount(account)
    if (!ethereum) {
      alert("Please install Metamask!")
    }
  }

  const handleDisconnect = async () => {
    await web3Modal.clearCachedProvider();
    setConnected(false)
    setAccount(null)
  }

  return (
    (connected ?
      <>
        <button onClick={handleDisconnect} className='cta-button connect-wallet-button'>
          Disconnect Wallet
        </button> 
        <p> Wallet address: {account} </p>
      </> :
      <button onClick={handleConnect} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  )
}

export default ConnectWalletButton
