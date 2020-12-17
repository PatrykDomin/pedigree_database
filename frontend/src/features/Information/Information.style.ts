import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  information: {
    minHeight: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(10, 12),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 6),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 0),
    },
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:last-child': {
      marginTop: theme.spacing(4),
      flexDirection: 'row-reverse',
    },
  },
  content: {
    width: '60%',
    padding: theme.spacing(0, 3),
    '& h2': {
      fontSize: 28,
      marginBottom: theme.spacing(3),
    },
    '& p': {
      fontSize: 14,
      letterSpacing: 0.8,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  image: {
    width: '32%',
    minWidth: 300,
    height: 280,
    borderRadius: 16,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
