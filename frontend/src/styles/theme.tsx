import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  spacing: 4,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'h1, h2, h3, h4, h5': {
          margin: '10px 0',
        },
        'body, html': {
          height: '100%',
          boxSizing: 'border-box',
        },
        '.main-root': {
          height: '100%',
        },
        textarea: {
          fontFamily: `"Mulish", "Helvetica", "Arial", sans-serif`,
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
    fontFamily: `"Mulish", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  shape: {
    borderRadius: 10,
  },
})

export default theme
