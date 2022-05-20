import React, { useCallback, useState } from 'react'
import { Grid, Card, CardActions, CardContent, Typography, TextField, Button } from "@mui/material"
import { approveMatic, approveDai, addLiquidity } from '../../utils/helpers'

const LiquidityForm = () => {
  const [maticValue, setMaticValue] = useState('')
  const [daiValue, setDaiValue] = useState('')
  const [maticApproved, setMaticApproved] = useState(false)
  const [daiApproved, setDaiApproved] = useState(false)

  const handleAddLiquidity = useCallback(
    async () => {
      if (Number(maticValue) !== 0 && Number(daiValue) !== 0) {
        await addLiquidity(maticValue, daiValue)
      } else {
        alert("zero values")
      }
    }, [maticValue, daiValue]
  )

  const handleApproveMatic = useCallback(
    async () => {
      if (Number(maticValue) !== 0) {
        const res = await approveMatic(Number(maticValue))
        setMaticApproved(res)
      } else {
        alert("Zero value")
      }
    }, [maticValue]
  )

  const handleApproveDai = useCallback(
    async () => {
      if (Number(daiValue) !== 0) {
        const res = await approveDai(Number(daiValue))
        setDaiApproved(res)
      } else {
        alert("Zero value")
      }
    }, [daiValue]
  )

  return (
    <Card variant="outlined"  sx={{ maxWidth: 400 }}>
      <CardContent>
        <Grid container spacing={{ xs: 2, md: 3 }} rowSpacing={1}>
          <Grid item xs={7}>
            <TextField id="matic" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: "0" }} onChange={(e) => {setMaticValue(e.target.value);}} name="matic" type="number" placeholder="0.00" variant="outlined" />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5" component="div">
              MATIC
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField id="dai" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: "0" }} onChange={(e) => {setDaiValue(e.target.value);}} name="dai" type="number" placeholder="0.00" variant="outlined" />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5" component="div">
              DAI
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        { maticValue !== '' && !maticApproved &&
          <Button size="small" color="primary" onClick={handleApproveMatic}>
            Approve Matic
          </Button>
        }
        {daiValue !== '' && !daiApproved &&
          <Button size="small" color="primary" onClick={handleApproveDai}>
            Approve Dai
          </Button>
        }
        {maticApproved && daiApproved &&
          <Button size="small" color="primary" onClick={handleAddLiquidity}>
            Add Liquidity
          </Button>
        }
      </CardActions>
    </Card>
  )
}

export default LiquidityForm
