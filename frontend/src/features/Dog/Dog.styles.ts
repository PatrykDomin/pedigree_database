import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverseh',
    },
  },
  tree: {
    maxWidth: 1260,
    marginRight: theme.spacing(4),
    width: '100%',
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
    '& h1': {
      textAlign: 'center',
      marginBottom: theme.spacing(1),
    },
  },
  dogData: {
    width: 260,
    minWidth: 260,
    marginBottom: theme.spacing(4),
    '& h1': {
      fontSize: 32,
    },
  },
  dogDataTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
