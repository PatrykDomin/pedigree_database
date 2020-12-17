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
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
    },
  },
  menuBtn: {
    width: 44,
    height: 44,
    fill: 'black',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
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
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(0, 12),
      width: '100%',
      flexDirection: 'column',
      '& a': {
        width: '100%',
        fontSize: 28,
        textAlign: 'center',
        margin: theme.spacing(1, 0),
      },
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 5),
    },
  },
}));
