import { createMuiTheme } from '@material-ui/core/styles'
import { primaryColor, secondaryColor, textPrimaryColor } from './constants'

export const theme = createMuiTheme({
  spacing: 4,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'h1, h2, h3, h4, h5': {
          margin: 0,
        },
        p: {
          margin: 0,
        },
        'body, html': {
          height: '100%',
          boxSizing: 'border-box',
        },
        '.main-root': {
          height: '100%',
        },
        textarea: {
          fontFamily: `'Roboto Slab', serif`,
        },
      },
    },
    MuiButton: {
      root: {
        minWidth: '42px',
      },
    },
  },
  typography: {
    fontFamily: `'Roboto Slab', serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  shape: {
    borderRadius: 10,
  },
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    text: {
      primary: textPrimaryColor,
    },
  },
})

export default theme
