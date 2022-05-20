import React from 'react'
import { Grid, Card, CardActions, CardContent, Typography, TextField, Button } from "@mui/material"

const LiquidityForm = ({maticValue, daiValue, maticApproved, daiApproved, onMaticChange, onDaiChange, onApproveDai, onApproveMatic}) => {
  return (
    <Card variant="outlined"  sx={{ maxWidth: 400 }}>
      <CardContent>
        <Grid container spacing={{ xs: 2, md: 3 }} rowSpacing={1}>
          <Grid item xs={7}>
            <TextField id="matic" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: "0" }} onChange={onMaticChange} name="matic" type="number" placeholder="0.00" variant="outlined" />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5" component="div">
              MATIC
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField id="dai" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: "0" }} onChange={onDaiChange} name="dai" type="number" placeholder="0.00" variant="outlined" />
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
          <Button size="small" color="primary" onClick={onApproveMatic}>
            Approve Matic
          </Button>
        }
        {daiValue !== '' && !daiApproved &&
          <Button size="small" color="primary" onClick={onApproveDai}>
            Approve Dai
          </Button>
        }
      </CardActions>
    </Card>
  )
}

export default LiquidityForm
