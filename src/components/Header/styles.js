import { makeStyles } from "@mui/styles"

export default makeStyles(theme => ({
  logo: {
    position: 'absolute',
    width: '100px',
    height: '39px',
    left: theme.spacing(8),
    top: '60px',

    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '32px',
    lineHeight: '39px',
    /* identical to box height */

    display: 'flex',
    alignItems: 'center',

    color: '#FFFFFF'
  },
  toolbar: {
    height: '160px'
  },
  buttonGroup: {
    position: 'absolute',
    right: theme.spacing(8) 
  },
  dropdown: {
    minWidth: theme.spacing(26)
  }
}))
