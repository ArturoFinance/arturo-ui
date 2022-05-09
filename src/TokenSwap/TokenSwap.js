import React, { useCallback, useState } from 'react'
import { Grid, Card, CardActions, CardContent, Typography, TextField, Button } from "@mui/material"
import { swap } from '../utils/helpers'

const TokenSwap = () => {
  const [maticValue, setMaticValue] = useState('')

  const handleSwap = useCallback(
    async () => {
      if (Number(maticValue) !== 0) {
        await swap(maticValue)
      } else {
        alert("zero values")
      }
    }, [maticValue]
  )

  return (
    <Card variant="outlined"  sx={{ maxWidth: 400 }}>
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
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5" component="div">
              With DAI
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {maticValue !== '' &&
          <Button size="small" color="primary" onClick={handleSwap}>
            swap
          </Button>
        }
      </CardActions>
    </Card>
  )
}

export default TokenSwap
