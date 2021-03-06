import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  dialog: {
    padding: theme.spacing(10, 8),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.dark,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(8, 6),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4, 3),
    },
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    padding: theme.spacing(0, 0, 6),
    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
      padding: theme.spacing(0, 0, 4),
    },
  },
  content: {
    padding: theme.spacing(0, 5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2),
    },
  },
  actions: {
    alignSelf: 'center',
    width: '80%',
    justifyContent: 'space-evenly',
    padding: theme.spacing(7, 0, 0),
    '& button': {
      width: 160,
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(4),
      width: '100%',
      flexDirection: 'column-reverse',
      '& button': {
        width: '100%',
        '&:last-child': {
          marginBottom: theme.spacing(4),
        },
      },
    },
  },
}));
