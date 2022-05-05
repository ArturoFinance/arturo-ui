import React, { useCallback, useMemo, useEffect, useState} from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Box
} from '@mui/material';
import { ethers } from 'ethers'
import { NETWORK_OPTIONS } from '../../config/constants';
import Web3Modal from "web3modal";

import ButtonGroup from "../HeaderButtonGroup"
import SelectButton from '../SelectButton';
import { WALLET_OPTIONS } from '../../config/constants';
import useStyles from './styles'

const Header = () => {
  const classes = useStyles()
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState(null)

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

  const web3Modal = useMemo(
    () => (
      new Web3Modal({
        network: "testnet", // optional
        cacheProvider: true, // optional
        providerOptions: {} // required
      })
    ), []
  )

  const handleConnect = useCallback(
    async () => {
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
    }, [web3Modal]
  )

  const addressOptions = useMemo(
    () => [account]
    ,[account]
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar disableGutters className={classes.toolbar}>
          <Typography
            className={classes.logo}
            variant="h4"
            noWrap
            component="div"
          >
            Arturo
          </Typography>
          { !connected ?
              <ButtonGroup
                options={WALLET_OPTIONS}
                classes={classes}
                onClick = {handleConnect}
                title = 'Connect Wallet'
              /> : 
              <div className={classes.buttonGroup}>
                <SelectButton
                  options={addressOptions}
                />
                <SelectButton
                  options={NETWORK_OPTIONS}
                />
              </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header