import React, { useEffect, useState } from 'react'
import { FormattedNumber } from 'react-intl'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ethers } from 'ethers'

const TokenPriceTable = () => {
  const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com")
  const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
  const addrETH = "0x0715A7794a1dc8e42615F059dD6e406A6594651A"
  const addrBTC = "0x007A22900a3B98143368Bd5906f8E17e9867581b"

  const [ethPrice, setEthePrice] = useState(0) 
  const [btcPrice, setBtcPrice] = useState(0) 

  useEffect(
    () => {
      const ethPriceFeed = new ethers.Contract(addrETH, aggregatorV3InterfaceABI, provider)
      const btcPriceFeed = new ethers.Contract(addrBTC, aggregatorV3InterfaceABI, provider)
      let timer = setInterval(
        () => {
          ethPriceFeed.latestRoundData()
          .then((roundData) => {
            setEthePrice(roundData.answer.toNumber()/ Math.pow(10, 8))
          })

          btcPriceFeed.latestRoundData()
          .then((roundData) => {
            setBtcPrice(roundData.answer.toNumber()/ Math.pow(10, 8))
          }) 
        },
        10000
      )
      return () => {
        clearInterval(timer)
      }
    }
  )

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>RECENTLY USED</TableCell>
            <TableCell align="right">PRICE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={0}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              ETH/USD
            </TableCell>
            <TableCell align="right"><FormattedNumber format="currency" value={ethPrice} /></TableCell>
          </TableRow>
          <TableRow
            key={1}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              BTC/USD
            </TableCell>
            <TableCell align="right">
              <FormattedNumber format="currency" value={btcPrice} /></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )

}

export default TokenPriceTable