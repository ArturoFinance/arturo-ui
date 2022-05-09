import React, { useState } from 'react';
import Modal from 'react-modal';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import SelectButton from '../SelectButton'
import { SUPPORTED_WALLETS } from '../../constants/wallet';
import { NETWORK_OPTIONS } from '../../constants/constants'


import './ConnectWallet.css';
import { Button } from '@mui/material';
Modal.setAppElement('#root');

const ConnectWallet = ({classes}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  // const [currentAccount, setCurrentAccount] = useState(null);
  const { account, activate} = useWeb3React();
  
  if (account !== undefined) {
    localStorage.setItem('Account', account)
  } else {

  }

  const tryActivation = async (wallet) => {
    // const name = wallet.name
    const connector = wallet.connector

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined;
    }

    connector && activate(connector, undefined, true)
      .then((res) => {
        console.log({res})
        setIsOpen(false)
      })
      .catch((error) => {
        if (error) {
          activate(connector);
        } else {
        }
      });
  };
  
  return (
    <>
      <div className={classes.buttonGroup}>
        {account === undefined ?
          <Button variant='outlined' onClick={()=>{ setIsOpen(true) }}>
            Connect wallet
          </Button> :
          <div>
            <Button variant="contained" color='secondary' onClick={()=>{ setIsOpen(true) }}>
              {`${account.slice(2, 6)}...${account.slice(38, 42)}`}
            </Button>
            <SelectButton
              options={NETWORK_OPTIONS}
            />
          </div>
        }
        
      </div> 
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={()=>{ setIsOpen(false) }}
        className='connectWallet__modal'
        contentLabel="Example Modal"
      >
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:'20px auto'}}>
          <label className='connectWallet__title'>Select a wallet</label>
          <FontAwesomeIcon icon={faTimes} className='connectWallet__close__icon' onClick={()=>{ setIsOpen(false) }}/>
        </div>
        {
          Object.values(SUPPORTED_WALLETS).map((wallet, idx) => 
            <button className='connectWallet__wallet' onClick={() => tryActivation(wallet)} key={idx}>
              <span className='connectWallet__wallet__name'>{wallet.name}</span>
              <img src={wallet.iconURL} className='connectWallet__wallet__icon' alt='wallet'/>
            </button>
          )
        }
      </Modal>
    </>
  )
}

export default ConnectWallet;