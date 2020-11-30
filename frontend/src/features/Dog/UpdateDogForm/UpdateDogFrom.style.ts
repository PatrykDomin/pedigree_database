import { makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
  btnWrapper: {
    display: 'flex',
    alignSelf: 'center',
    width: '80%',
    margin: '0 auto',
    justifyContent: 'space-between',
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
