import React, { useCallback, useState, useMemo } from 'react'
import { Grid, Card, CardActions, CardContent, Typography, TextField, Button } from "@mui/material"
import {
  QUICKSWAP_CONTRACT_ADDRESS,
  WMATIC_CONTRACT_ADDRESS,
  DAI_CONTRACT_ADDRESS,
  QUICKSWAP_CONTRACT_ABI,
  WMATIC_CONTRACT_ABI,
  DAI_CONTRACT_ABI
} from '../../config/contract'
import { ethers } from 'ethers'

const LiquidityForm = ({signer}) => {
  const [maticValue, setMaticValue] = useState(0)
  const [daiValue, setDaiValue] = useState(0)
  const [maticApproved, setMaticApproved] = useState(false)
  const [daiApproved, setDaiApproved] = useState(false)

  const quickswapContract = useMemo(
    () => new ethers.Contract(QUICKSWAP_CONTRACT_ADDRESS, QUICKSWAP_CONTRACT_ABI, signer)
    , [signer]
  )

  const handleClick = useCallback(
    (event) => {
      event.preventDefault()

      quickswapContract.addLiquidityToQuickswap(
        WMATIC_CONTRACT_ADDRESS,
        DAI_CONTRACT_ADDRESS,
        maticValue,
        daiValue
      )
    }, [maticValue, daiValue, quickswapContract]
  )

  const handleApproveMatic = useCallback(
    () => {
      console.log(signer)
      const wmaticContract = new ethers.Contract(WMATIC_CONTRACT_ADDRESS, WMATIC_CONTRACT_ABI, signer)
      wmaticContract.approve(quickswapContract, maticValue)
      setMaticApproved(true)
    }, [maticValue, quickswapContract, signer]
  )

  const handleApproveDai = useCallback(
    () => {
      const daiContract = new ethers.Contract(DAI_CONTRACT_ADDRESS, DAI_CONTRACT_ABI, signer)
      daiContract.approve(quickswapContract, daiValue)
      setDaiApproved(true)
    }, [daiValue, quickswapContract, signer]
  )

  return (
    <Card variant="outlined" sx={{ maxWidth: 400 }}>
      <CardContent>
        <Grid container spacing={{ xs: 2, md: 3 }} rowSpacing={1}>
          <Grid item xs={7}>
            <TextField id="matic" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: "0" }} onChange={(e) => setMaticValue(e.target.value)} name="matic" type="number" placeholder="0.00" variant="outlined" />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5" component="div">
              MATIC
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField id="dai" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: "0" }} onChange={(e) => setDaiValue(e.target.value)} name="dai" type="number" placeholder="0.00" variant="outlined" />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5" component="div">
              DAI
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {maticValue !== 0 &&
          <Button size="small" color="primary" onClick={handleApproveMatic}>
            Approve Matic
          </Button>
        }
        {daiValue !== 0 &&
          <Button size="small" color="primary" onClick={handleApproveDai}>
            Approve Dai
          </Button>
        }
        {maticApproved && daiApproved &&
          <Button size="small" color="primary" onClick={handleClick}>
            Add Liquidity
          </Button>
        }
      </CardActions>
    </Card>
  )
}

export default LiquidityForm
