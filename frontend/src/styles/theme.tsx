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
        minWidth: 44,
        height: 40,
      },
    },
    MuiDialogActions: {
      spacing: {
        '& > :not(:first-child)': {
          marginLeft: 0,
        },
      },
    },
    MuiInput: {
      root: {
        color: 'white',
      },
      underline: {
        '&:hover:not($disabled):after': {
          // hover + focus
        },
        '&:hover:not($disabled):before': {
          // hover
          borderBottom: `2.7px solid #b29c5b`,
        },
        '&:after': {
          // focus
          borderBottom: `2.7px solid ${primaryColor}`,
        },
        '&:before': {
          // no action
          borderBottom: '2.7px solid white',
        },
      },
    },
    MuiSvgIcon: {
      root: {
        color: 'white',
      },
    },
    MuiSelect: {
      icon: {
        color: 'white',
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
