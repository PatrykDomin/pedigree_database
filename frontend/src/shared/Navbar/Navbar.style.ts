import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  navbar: {
    padding: theme.spacing(0, 9),
    height: 100,
    width: '100%',
    backgroundColor: theme.palette.primary.light,
    borderBottom: `1px solid ${theme.palette.common.black}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    color: theme.palette.text.primary,
    letterSpacing: 1,
    fontSize: 32,
    fontWeight: theme.typography.fontWeightBold,
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '40%',
    '& a': {
      textDecoration: 'none',
      outline: 'none',
      margin: theme.spacing(0, 3),
      fontSize: 24,
      color: theme.palette.text.primary,
      cursor: 'pointer',
      transition: 'text-shadow 0.2s ease-in-out',
      '&:hover': {
        textShadow: `0 0 .5px ${theme.palette.text.primary}, 0 0 .5px ${theme.palette.text.primary}`,
      },
    },
  },
}));
