import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    minWidth: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  children: {
    padding: theme.spacing(9, 9, 12),
  },
  footer: {
    width: '100%',
    marginTop: 'auto',
    textAlign: 'right',
    fontSize: 15,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2, 3),
    '& a': {
      color: theme.palette.secondary.light,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.secondary.dark,
      },
    },
  },
}));
