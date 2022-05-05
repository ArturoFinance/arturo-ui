import tinycolor from 'tinycolor2'

const primary = '#E73CA2'
const secondary = '#565656'
const warning = '#FFC260'
const success = '#3CD4A0'
const info = '#9013FE'

const lightenRate = 7.5
const darkenRate = 15

const defaultTheme =  {
  palette: {
    mode: 'dark',
    primary: {
      main: primary,
      light: tinycolor(primary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(primary)
        .darken(darkenRate)
        .toHexString()
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(secondary)
        .darken(darkenRate)
        .toHexString(),
      contrastText: '#FFFFFF'
    },
    warning: {
      main: warning,
      light: tinycolor(warning)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(warning)
        .darken(darkenRate)
        .toHexString()
    },
    success: {
      main: success,
      light: tinycolor(success)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(success)
        .darken(darkenRate)
        .toHexString()
    },
    info: {
      main: info,
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString()
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#6E6E6E',
      hint: '#B9B9B9'
    },
    background: {
      default: '#1C1C1C',
      paper: '#1C1C1C'
    }
  }
}

export default defaultTheme