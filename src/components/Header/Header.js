import React from 'react'
import {
  Typography
} from '@mui/material'

import ConnectWallet from '../ConnectWallet'
import useStyles from './styles'

const Header = () => {
  const classes = useStyles()

  return (
    <div className={classes.header}>
      <Typography
        className={classes.logo}
        variant="h4"
        noWrap
        component="div"
      >
        Arturo
      </Typography>

      <ConnectWallet
        classes={classes}
      />
    </div>
  )
}

export default Header
